import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setAutoSuggestInputValue } from './../../../redux/actions';
// Apollo
import { useApolloClient } from '@apollo/client';
import { AutoSuggestQuery as AUTO_SUGGEST_QUERY } from './AutoSuggest.gql';
// Utils
import filterBySearchInput from './../../../utils/filterBySearchInput';
// Components
import { default as SharedSearchForm } from './../../shared/SearchForm';

function SearchForm() {
  const router = useRouter();

  // Local state
  // Filtered items based on search input.
  const [suggestions, setSuggestions] = useState([]);
  // All possible items from datasource.
  const [autoSuggestItems, setAutoSuggestItems] = useState();

  // Redux
  const {
    autoSuggestInputValue,
  } = useSelector(state => state.search);
  const dispatch = useDispatch();
  

  // Apollo
  const client = useApolloClient();
  
  // When component mounts, prefetch the items for autosuggest.
  useEffect(() => {
    client.query({ query: AUTO_SUGGEST_QUERY }).then(
      response => {
        setAutoSuggestItems(response.data.allResourceTopics);
      },
      error => {
        //console.error(error);
      }
    );
  },[autoSuggestItems]);

  function getSuggestions(autoSuggestItems, value) {
    if (autoSuggestItems) {
      return filterBySearchInput(autoSuggestItems, value);
    }
    else {
      console.log('data is false');
      return [];
    }
  }

  function onSuggestionsFetchRequested(value) {
    dispatch(setAutoSuggestInputValue(value));
    setSuggestions(getSuggestions(autoSuggestItems, value));
  }

  function onSuggestionSelected(event, { suggestion }) {
    /*dispatch(setMapInfoWindow({
      infoWindowId: suggestion.id,
      infoWindowIsVisible: false
    }));
    */
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
    console.log('handleSubmit!')
    console.log(autoSuggestInputValue)

    //dispatch(setAutoSuggestInputValue(newValue));
    // Dispatch search query
    dispatch(setSearchQuery({
      query: autoSuggestInputValue
    }));
    
    // Add query string to url
    router.push({
      query: { q: autoSuggestInputValue }
    })
  }

  return (
    <SharedSearchForm
      id='online-resources-form'
      label={''}
      onSubmit={handleSubmit}
      suggestions={suggestions}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      autoSuggestInputValue={autoSuggestInputValue}
      inputOnChange={inputOnChange}
    >
      <div>children prop!</div>
    </SharedSearchForm>
  );
};

export default SearchForm;
