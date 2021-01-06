import React, { Fragment, useState } from 'react';
// Apollo
import { useLazyQuery } from '@apollo/client';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchAutoSuggest.gql';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setMapInfoWindow,
  setAutoSuggestInputValue
} from './../../../redux/actions';
// Utils
import filterBySearchInput from './../../../utils/filterBySearchInput';
// Components
import AutoSuggest from 'react-autosuggest';

function SearchAutoSuggest() {
  // Local state
  const [suggestions, setSuggestions] = useState([]);
  const [locationId, setLocationId] = useState('');

  // Redux
  const dispatch = useDispatch();
  const {
    autoSuggestInputValue
  } = useSelector(state => state.search);

  // Query the apollo cache for locations data.
  // useLazyQuery hook is used because the query doesn't happen until
  // the user starts typing in the search box.
  const [
    getLocations,
    { loading, data }
  ] = useLazyQuery(LOCATIONS_QUERY, {});

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
      <div {...containerProps} aria-label="Filter search">
        {children}
        <div className='auto-suggest-bottom'>
          Search for locations near: <strong>{query}</strong>
        </div>
      </div>
    );
  }

  // Custom input component to add aria-label.
  function renderInputComponent(inputProps) {
    return (
      <input name="search" aria-label="Search locations" {...inputProps} />
    );
  }

  function onSuggestionSelected(event, { suggestion }) {
    dispatch(setMapInfoWindow({
      infoWindowId: suggestion.id,
      infoWindowIsVisible: false
    }));
  }

  return (
    <Fragment>
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
        renderInputComponent={renderInputComponent}
        highlightFirstSuggestion={false}
      />
    </Fragment>
  );
};

export default SearchAutoSuggest;
