import React, { Fragment, useEffect, useState } from 'react';
// Redux
import {
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
import AutoSuggest from './../../shared/AutoSuggest/AutoSuggest';

// Apollo
import { useApolloClient } from '@apollo/client';
import { LocationsQuery as LOCATIONS_QUERY } from './../SearchForm/SearchForm.gql';

function SearchAutoSuggest() {
  // Local state
  // Filtered items based on search input.
  const [suggestions, setSuggestions] = useState([]);
  // All possible items from datasource.
  const [autoSuggestItems, setAutoSuggestItems] = useState();

  // Apollo
  const client = useApolloClient();
  
  // When component mounts, prefetch the items for autosuggest.
  useEffect(() => {
    console.log('userEffect!')

    client.query({ query: LOCATIONS_QUERY }).then(
      response => {
        setAutoSuggestItems(response.data.allLocations.locations);
      },
      error => {
        //console.error(error);
      }
    );
  },[autoSuggestItems]);

  // Redux
  const dispatch = useDispatch();
  const {
    autoSuggestInputValue
  } = useSelector(state => state.search);

  function getSuggestions(autoSuggestItems, value) {
    if (autoSuggestItems) {
      return filterBySearchInput(autoSuggestItems, value);
    }
    else {
      console.log('data is false');
      return [];
    }
  }

  function onSuggestionSelected(event, { suggestion }) {
    dispatch(setMapInfoWindow({
      infoWindowId: suggestion.id,
      infoWindowIsVisible: false
    }));
  }

  function onSuggestionsFetchRequested(value) {
    dispatch(setAutoSuggestInputValue(value));
    setSuggestions(getSuggestions(autoSuggestItems, value));
  }

  function inputOnChange(newValue) {
    dispatch(setAutoSuggestInputValue(newValue));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  return (
    <AutoSuggest
      id='12'
      label='Location Finder'
      inputOnChange={inputOnChange}
      suggestions={suggestions}
      autoSuggestInputValue={autoSuggestInputValue}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
    />
  );
};

export default SearchAutoSuggest;
