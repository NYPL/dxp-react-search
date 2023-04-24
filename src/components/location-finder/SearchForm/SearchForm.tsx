import * as React from "react";
// Redux
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setSearchQuery,
  setMapPosition,
  setMapInfoWindow,
  setOpenNow,
  setAutoSuggestInputValue,
} from "./../../../redux/actions";
// Apollo
import { gql, useApolloClient } from "@apollo/client";
// Utils
import filterBySearchQuery, {
  FilterableItem,
} from "../../../utils/filter-by-search-query";
// Geocode
import Geocode from "./../../../utils/googleGeocode";
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
Geocode.setApiKey(NEXT_PUBLIC_GOOGLE_MAPS_API as string);
const southWestBound = "40.49, -74.26";
const northEastBound = "40.91, -73.77";
Geocode.setBounds(`${southWestBound}|${northEastBound}`);
// Components
import { Box, Checkbox } from "@nypl/design-system-react-components";
import { default as SharedSearchForm } from "./../../shared/SearchForm";
import SearchFilters from "./../SearchFilters";
// Types
import { LocationProps } from "./../Location/Location";

// Combined the FilterableItem type from filter-by-search-query to add Location specific props.
type LocationType = FilterableItem & LocationProps;

export const LOCATIONS_QUERY = gql`
  query LocationsQuery {
    refineryAllLocations {
      locations {
        id
        name
        address_line1
        address_line2
        locality
        administrative_area
        postal_code
        synonyms
      }
    }
  }
`;

export default function SearchForm() {
  // Local state
  // Filtered items based on search input.
  const [suggestions, setSuggestions] = React.useState<LocationType[]>([]);
  // All possible items from datasource.
  const [autoSuggestItems, setAutoSuggestItems] = React.useState([]);

  // Redux
  const { autoSuggestInputValue, openNow } = useSelector(
    (state: RootState) => state.search
  );
  const { infoWindowId } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  // Apollo
  const client = useApolloClient();

  // When component mounts, prefetch the items for autosuggest.
  React.useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    client.query({ query: LOCATIONS_QUERY }).then(
      (response) => {
        setAutoSuggestItems(response.data.refineryAllLocations.locations);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [autoSuggestItems]);

  // Helper function to get suggestions for the autosuggest.
  function getSuggestions(autoSuggestItems: LocationType[], value: string) {
    if (autoSuggestItems) {
      return filterBySearchQuery(autoSuggestItems, value);
    }
    return [];
  }

  function handleSuggestionsFetchRequested(value: string) {
    // Dispatch the redux action to set the autosuggest input value state.
    dispatch(setAutoSuggestInputValue({ autoSuggestInputValue: value }));
    const suggestions = getSuggestions(autoSuggestItems, value);
    // Set the suggestions to the local state.
    setSuggestions(suggestions as LocationType[]);
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    // Query to get all locations.
    client.query({ query: LOCATIONS_QUERY }).then(
      (response) => {
        // Set the default search value to the input value from the "autosuggest" search box.
        let searchQuery: string = autoSuggestInputValue;

        // Try to find a location match, if so set the search value to a string with the location's name and address.
        // We do this to get more accurate results from the Google GeoCode API.
        const locationsFiltered = filterBySearchQuery(
          response.data.refineryAllLocations.locations as LocationType[],
          searchQuery
        );
        const locationMatch = locationsFiltered[0];

        if (locationMatch) {
          // Genereate a string with the location's name and address, this returns more accurate results from the Google GeoCode API.
          const locationMatchAddress = `${locationMatch.name}, ${locationMatch.address_line1} ${locationMatch.locality} ${locationMatch.administrative_area} ${locationMatch.postal_code}`;
          // Strip out the parenthetical text that sometimes gets added to Location street address fields.
          searchQuery = locationMatchAddress.replace(/(\(.*\))/g, "");
        }

        // Get latitude & longitude from search value.
        Geocode.fromAddress(searchQuery).then(
          (response) => {
            const infoWindowIdFinal = locationMatch
              ? locationMatch.id
              : infoWindowId;
            const infoWindowIsVisibleFinal = locationMatch ? true : false;

            batch(() => {
              // Dispatch search query
              dispatch(
                setSearchQuery({
                  query: autoSuggestInputValue,
                  lat: response.results[0].geometry.location.lat,
                  lng: response.results[0].geometry.location.lng,
                })
              );
              // Dispatch for map zoom and center
              dispatch(
                setMapPosition({
                  mapCenter: response.results[0].geometry.location,
                  mapZoom: 14,
                })
              );
              // Dispatch for map info window.
              dispatch(
                setMapInfoWindow({
                  infoWindowId: infoWindowIdFinal,
                  infoWindowIsVisible: infoWindowIsVisibleFinal,
                })
              );
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <SharedSearchForm
      id="search-form"
      label={
        "Enter an address or landmark to search nearby or type in a Library name."
      }
      ariaLabel={"Find your library"}
      onSubmit={handleSubmit}
      autoSuggestInputId={"search-form__search-input"}
      autoSuggestAriaLabel={"Search locations"}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={() => setSuggestions([])}
      autoSuggestInputValue={autoSuggestInputValue}
      inputOnChange={(newValue: Record<string, any>) => {
        dispatch(setAutoSuggestInputValue({ autoSuggestInputValue: newValue }));
      }}
      suggestionContainerMsg={"Search for locations near:"}
      searchButtonId={"search-form__submit"}
    >
      <div className="search__form-filters">
        <Box
          sx={{
            alignSelf: "flex-end",
            "& label": {
              marginLeft: "s",
            },
          }}
        >
          <Checkbox
            id="checkbox-open-now"
            name="isOpenNow"
            labelText="Open now"
            showLabel={true}
            aria-label="Checking this box will update the results"
            isChecked={openNow}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                setOpenNow({
                  searchQuery: "",
                  openNow: event.target.checked,
                })
              );
            }}
          />
        </Box>
        <SearchFilters />
      </div>
    </SharedSearchForm>
  );
}
