import React from 'react';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setSearchQuery,
  setMapPosition,
  setMapInfoWindow,
  setOpenNow
} from './../../../redux/actions';
// Apollo
import { useApolloClient } from '@apollo/client';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchForm.gql';
// Utils
import filterBySearchInput from './../../../utils/filterBySearchInput';
// Components
import SearchAutoSuggest from './../SearchAutoSuggest';
import * as DS from '@nypl/design-system-react-components';
import SearchFilters from './SearchFilters';
// Geocode
import Geocode from './../../../utils/googleGeocode';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
Geocode.setApiKey(NEXT_PUBLIC_GOOGLE_MAPS_API);
const southWestBound = '40.49, -74.26';
const northEastBound = '40.91, -73.77';
Geocode.setBounds(`${southWestBound}|${northEastBound}`);

function SearchForm() {
  // Redux
  const {
    autoSuggestInputValue,
    openNow
  } = useSelector(state => state.search);
  const { infoWindowId } = useSelector(state => state.map);
  const dispatch = useDispatch();

  // Apollo
  const client = useApolloClient();

  function handleSubmit(event) {
    event.preventDefault();

    // Query to get the list of locations
    client.query({ query: LOCATIONS_QUERY }).then(
      response => {
        let searchValue = autoSuggestInputValue;
        // Try to find a location match.
        const matchLocation = filterBySearchInput(response.data.allLocations.locations, autoSuggestInputValue);
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
          searchValue = `${location.address_line1} ${location.locality} ${location.administrative_area} ${location.postal_code}`;
        }

        // Get latitude & longitude from search value.
        Geocode.fromAddress(searchValue).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;

            batch(() => {
              // Dispatch search query
              dispatch(setSearchQuery({
                query: autoSuggestInputValue,
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng
              }));

              // Dispatch for map zoom and center
              dispatch(setMapPosition({
                mapCenter: response.results[0].geometry.location,
                mapZoom: 14
              }));

              // Dispatch for map info window.
              dispatch(setMapInfoWindow({
                infoWindowId,
                infoWindowIsVisible: true
              }));
            });
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
  }

  function onChangeOpenNow(event) {
    dispatch(setOpenNow({
      searchQuery: '',
      openNow: event.target.checked
    }));
  }

  return (
    <div className='search__form'>
      <form
        role='search'
        aria-label='Find your library'
        onSubmit={handleSubmit}>
        <SearchAutoSuggest />
        <DS.Button
          buttonType="filled"
          id="button"
          mouseDown={false}
          type="submit"
        >
          <DS.Icon
            decorative
            modifiers={[
              'small',
              'icon-left'
            ]}
            name="search_small"
          />
          Search
        </DS.Button>
        <div className="checkbox">
          <input
            id="isOpenNow"
            className="checkbox__input"
            type="checkbox"
            name="isOpenNow"
            checked={openNow}
            onChange={onChangeOpenNow}
            aria-label="Checking this box will update the results"
          />
          <label
            id="label"
            htmlFor="isOpenNow"
            className="label">
            Open Now
          </label>
        </div>
        <SearchFilters />
      </form>
    </div>
  );
};

export default SearchForm;
