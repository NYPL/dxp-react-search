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
  // Local state
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    //console.log('SearchForm useEffect!');

    if (reset && openNow) {
      console.log('useEffect Reset!');
      setIsOpenNow(false);
    }
  });

  // Redux
  const dispatch = useDispatch();
  const {
    autoSuggestInputValue,
    openNow,
    reset
  } = useSelector(state => state.search);

  const { infoWindowId } = useSelector(state => state.map);

  console.log('isOpenNow: ' + isOpenNow);
  console.log('openNow: ' + openNow);

  function handleSubmit(event) {
    event.preventDefault();

    // Get latitude & longitude from address.
    Geocode.fromAddress(autoSuggestInputValue).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        batch(() => {
          // Dispatch search query
          dispatch(setSearchQuery({
            query: autoSuggestInputValue,
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng,
            isSubmitted: true
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
          dispatch(setOpenNow(isOpenNow));

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

  function handleInputChange(event) {
    console.log('handleInputChange!');
    const target = event.target;
    const value = target.name === 'isOpenNow' ? target.checked : target.value;
    setIsOpenNow(value);
    //setIsOpenNow(!isOpenNow);
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
          iconDecorative
          iconName="search_small"
          iconPosition="icon-left"
          id="button"
          mouseDown={false}
          type="submit"
        >
          Search
        </DS.Button>
        <label>
          Open now
          <input
            name="isOpenNow"
            type="checkbox"
            checked={isOpenNow}
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  );
};

export default SearchForm;
