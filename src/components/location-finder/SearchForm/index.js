import React from 'react';
import * as DS from '@nypl/design-system-react-components';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { useLazyQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchAutoSuggest.gql';
import filterBySearchInput from './../../../utils/filterBySearchInput';
// Redux
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSearchQueryGeo, setMapCenter, setMapZoom } from './../../../redux/actions';
// Geocode
import Geocode from 'react-geocode';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
Geocode.setApiKey(NEXT_PUBLIC_GOOGLE_MAPS_API);

function SearchForm() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const search_string = value;
  // Redux dispatch
  const dispatch = useDispatch();
  // Query the apollo cache for locations data.
  // useLazyQuery hook is used because the query doesn't happen until
  // the user starts typing in the search box.
  const [
    getLocations,
    { loading, data }
  ] = useLazyQuery(LOCATIONS_QUERY, {
    variables: { search_string },
  });

  function getSuggestions(data, value) {
    if (data) {
      return filterBySearchInput(data.allLocations, value);
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit called!');
    // Clear the suggestions
    //setSuggestions([])
    console.log('handleSubmit value: ' + value);

    // Call geocode service and get geocordinates for search term.
    // Dispatch the setSearchQuery action
    dispatch(setSearchQuery(value));

    // Get latitude & longitude from address.
    Geocode.fromAddress(value).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        dispatch(setSearchQueryGeo(response.results[0].geometry.location));
        // Dispatch for map zoom and center
        dispatch(setMapZoom(14));
        dispatch(setMapCenter(response.results[0].geometry.location));
      },
      error => {
        console.error(error);
      }
    );
  }

  function onSuggestionSelected() {
    console.log('onSuggestionSelected!');
  }

  return (
    <div className='search__form'>
      <form onSubmit={handleSubmit}>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            // Run the lazy gql query to get location suggestions
            getLocations();
            setValue(value);
            setSuggestions(getSuggestions(data, value));
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: '',
            value: value,
            onChange: (_, { newValue, method }) => {
              setValue(newValue);
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
          checkboxId="checkbox"
          labelOptions={{
            id: 'label',
            labelContent: 'Open now'
          }}
          onChange={function noRefCheck(){}}
        />
      </form>
    </div>
  );
};

export default SearchForm;
