import React, { useEffect, useState } from "react";
// Redux
import { batch, useDispatch, useSelector } from "react-redux";
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
import filterBySearchInput from "./../../../utils/filterBySearchInput";
// Geocode
import Geocode from "./../../../utils/googleGeocode";
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
Geocode.setApiKey(NEXT_PUBLIC_GOOGLE_MAPS_API);
const southWestBound = "40.49, -74.26";
const northEastBound = "40.91, -73.77";
Geocode.setBounds(`${southWestBound}|${northEastBound}`);
// Components
import { Box, Checkbox } from "@nypl/design-system-react-components";
import { default as SharedSearchForm } from "./../../shared/SearchForm";
import SearchFilters from "./../SearchFilters";

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

function SearchForm() {
  // Local state
  // Filtered items based on search input.
  const [suggestions, setSuggestions] = useState([]);
  // All possible items from datasource.
  const [autoSuggestItems, setAutoSuggestItems] = useState();

  // Redux
  const { autoSuggestInputValue, openNow } = useSelector(
    (state) => state.search
  );
  const { infoWindowId } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  // Apollo
  const client = useApolloClient();

  // When component mounts, prefetch the items for autosuggest.
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    client.query({ query: LOCATIONS_QUERY }).then(
      (response) => {
        setAutoSuggestItems(response.data.refineryAllLocations.locations);
      },
      (error) => {
        //console.error(error);
      }
    );
  }, [autoSuggestItems]);

  function getSuggestions(autoSuggestItems, value) {
    if (autoSuggestItems) {
      return filterBySearchInput(autoSuggestItems, value);
    } else {
      console.log("data is false");
      return [];
    }
  }

  function onSuggestionsFetchRequested(value) {
    dispatch(setAutoSuggestInputValue(value));
    setSuggestions(getSuggestions(autoSuggestItems, value));
  }

  // @TODO remove this, it's not needed anymore, since we dispatch this event in the form submit.
  function onSuggestionSelected(event, { suggestion }) {
    dispatch(
      setMapInfoWindow({
        infoWindowId: suggestion.id,
        infoWindowIsVisible: false,
      })
    );
  }

  function inputOnChange(newValue) {
    dispatch(setAutoSuggestInputValue(newValue));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  // FORM SUBMIT
  function handleSubmit(event) {
    event.preventDefault();

    // Query to get the list of locations
    client.query({ query: LOCATIONS_QUERY }).then(
      (response) => {
        // Set the default search value to the input value from the "autosuggest" search box.
        let searchValue = autoSuggestInputValue;
        // Try to find a location match, if so set the search value to a string with the location's name and address.
        // We do this to get more accurate results from the Google GeoCode API.
        // locationMatches.
        const matchLocation = filterBySearchInput(
          response.data.refineryAllLocations.locations,
          autoSuggestInputValue
        );

        if (matchLocation[0]) {
          // @TODO Searching directly for "Business Center at SNFL" or "snfl" returns a location in Spain
          // This is what google returns for this text:
          // https://www.google.com/maps/search/Business+Center+at+SNFL/@38.020501,-1.1476233,13z/data=!3m1!4b1
          //
          //searchValue = matchLocation[0].name;

          // Using a name + address, might work, but returns
          // "Stavros Niarchos Foundation Library (SNFL)" before "Business Center at SNFL" when searching for
          // the latter.....
          const location = matchLocation[0];
          searchValue = `${location.name}, ${location.address_line1} ${location.locality} ${location.administrative_area} ${location.postal_code}`;
          // Strip out the parenthetical text that sometimes gets added to Location street address fields.
          searchValue = searchValue.replace(/(\(.*\))/g, "");
        }

        console.log(searchValue);

        // Get latitude & longitude from search value.
        Geocode.fromAddress(searchValue).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;

            const infoWindowIdFinal = matchLocation[0]
              ? matchLocation[0].id
              : infoWindowId;

            const infoWindowIsVisibleFinal = matchLocation[0] ? true : false;

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

  function onChangeOpenNow(event) {
    dispatch(
      setOpenNow({
        searchQuery: "",
        openNow: event.target.checked,
      })
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
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      autoSuggestInputValue={autoSuggestInputValue}
      inputOnChange={inputOnChange}
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
            onChange={onChangeOpenNow}
          />
        </Box>
        <SearchFilters />
      </div>
    </SharedSearchForm>
  );
}

export default SearchForm;
