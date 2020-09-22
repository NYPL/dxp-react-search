import React, { Fragment, useEffect, useState } from 'react';
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
  setOpenNow,
  setPagination
} from './../../../redux/actions';
// Components
import SearchAutoSuggest from './../SearchAutoSuggest';
import * as DS from '@nypl/design-system-react-components';
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
    searchQuery,
    openNow
  } = useSelector(state => state.search);
  const { infoWindowId } = useSelector(state => state.map);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    // Get isOpenNow checkbox checked
    const isOpenNowChecked = event.target.isOpenNow.checked;

    // Get latitude & longitude from address.
    Geocode.fromAddress(autoSuggestInputValue).then(
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

          // Dispatch open now
          //dispatch(setOpenNow(openNow));

          // Reset pagination.
          dispatch(setPagination({
            offset: 0,
            pageCount: 0,
            pageNumber: 1,
            //resultsCount
          }));
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  function openNowChange(event) {
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
            class="checkbox__input"
            type="checkbox"
            name="isOpenNow"
            checked={openNow}
            onChange={openNowChange}
          />
          <label
            id="label"
            htmlFor="isOpenNow"
            className="label">
            Open Now
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
