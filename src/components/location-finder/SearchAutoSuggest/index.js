import React, { Fragment } from 'react';
import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { useLazyQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchAutoSuggest.gql';
import filterBySearchInput from './../../../utils/filterBySearchInput';

function SearchAutoSuggest() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const search_string = value;

  // Query the apollo cache for locations data.
  // useLazyQuery hook is used because the query doesn't happen until
  // the user starts typing in the search box.
  const [
    getLocations,
    { loading, data }
  ] = useLazyQuery(LOCATIONS_QUERY, {
    variables: { search_string },
  });

  // @TODO Figure out why you added this.
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
        <a href="http://google.com" target="_blank">
          {suggestion.name}
        </a>
      </span>
    );
  }

  return (
    <Fragment>
      <AutoSuggest
        suggestions={suggestions}
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
          }
        }}
        highlightFirstSuggestion={true}
      />
    </Fragment>
  );
};

export default SearchAutoSuggest;
