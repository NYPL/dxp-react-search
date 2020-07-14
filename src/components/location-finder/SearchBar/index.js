import React from 'react';
import * as DS from '@nypl/design-system-react-components';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { useLazyQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchAutoSuggest.gql';
import filterBySearchInput from './../../../utils/filterBySearchInput';
// Redux
import { useDispatch } from 'react-redux';
import { setSearchGeo } from './../../../redux/actions';

function SearchBar() {
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
    // Dispatch the setSearchGeo action
    dispatch(setSearchGeo(value));
  }

  function onSuggestionSelected() {
    console.log('onSuggestionSelected!');
  }

  return (
    <div className='SearchBar'>
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
      </form>
    </div>
  );
};

export default SearchBar;
