import React from 'react';
import * as DS from '@nypl/design-system-react-components';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { useLazyQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchAutoSuggest.gql';
import filterBySearchInput from './../../../utils/filterBySearchInput';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setMapPosition,
  setLocationInfoWindowId,
  setAutoSuggestInputValue,
  setOpenNow
} from './../../../redux/actions';
// Geocode
import Geocode from './../../../utils/googleGeocode';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
Geocode.setApiKey(NEXT_PUBLIC_GOOGLE_MAPS_API);
const southWestBound = '40.49, -74.26';
const northEastBound = '40.91, -73.77';
Geocode.setBounds(`${southWestBound}|${northEastBound}`);

function SearchForm() {
  // Local state
  const [suggestions, setSuggestions] = useState([]);
  const [locationId, setLocationId] = useState('');
  // Open now checkbox local state
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { autoSuggestInputValue } = useSelector(state => state.search);
  const search_string = autoSuggestInputValue;

  const searchGeoLat = 40.7532;
  const searchGeoLng = -73.9822;

  // Query the apollo cache for locations data.
  // useLazyQuery hook is used because the query doesn't happen until
  // the user starts typing in the search box.
  const [
    getLocations,
    { loading, data }
  ] = useLazyQuery(LOCATIONS_QUERY, {
    variables: {
      searchGeoLat,
      searchGeoLng
    }
  });

  function getSuggestions(data, value) {
    if (data) {
      return filterBySearchInput(data.allLocations.locations, value);
    }
    else {
      console.log('data is false');
      return [];
    }
  }

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  function renderSuggestion(suggestion) {
    return (
      <span>
        {suggestion.name}
      </span>
    );
  }

  function renderSuggestionsContainer({ containerProps, children, query }) {
    return (
      <div {...containerProps}>
        {children}
        <div className='auto-suggest-bottom'>
          Search for locations near: <strong>{query}</strong>
        </div>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Get latitude & longitude from address.
    Geocode.fromAddress(autoSuggestInputValue).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

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

        // Dispatch to set location id for info window.
        dispatch(setLocationInfoWindowId(locationId));

        // Dispatch open now
        dispatch(setOpenNow(isOpenNow));
      },
      error => {
        console.error(error);
      }
    );
  }

  function onSuggestionSelected(event, { suggestion }) {
    // Grab the location id and keep in local state
    // for use in form submit to send to redux.
    setLocationId(suggestion.id);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isOpenNow' ? target.checked : target.value;
    setIsOpenNow(value);
  }

  return (
    <div className='search__form'>
      <form onSubmit={handleSubmit}>
        <AutoSuggest
          suggestions={suggestions.slice(0, 5)}
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            // Run the lazy gql query to get location suggestions
            getLocations();
            dispatch(setAutoSuggestInputValue(value));
            setSuggestions(getSuggestions(data, value));
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          inputProps={{
            placeholder: '',
            value: autoSuggestInputValue,
            onChange: (_, { newValue, method }) => {
              dispatch(setAutoSuggestInputValue(newValue));
            },
          }}
          highlightFirstSuggestion={true}
        />
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
        <DS.Checkbox
          name="isOpenNow"
          checkboxId="checkbox"
          labelOptions={{
            id: 'label',
            labelContent: 'Open now'
          }}
          checked={isOpenNow}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchForm;
