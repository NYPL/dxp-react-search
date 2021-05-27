import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setAutoSuggestInputValue } from './../../../redux/actions';
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
  
  // @TODO Bad idea? sync the router state to redux?
  useEffect(() => {
    if (router.query.q) {
      dispatch(setAutoSuggestInputValue(router.query.q));
    }
  },[router.query.q]);

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
    return null;
  }

  function inputOnChange(newValue) {
    dispatch(setAutoSuggestInputValue(newValue));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Push form state into url.
    router.push({
      pathname: '/research/online-resources/search',
      query: { 
        q: autoSuggestInputValue,
        page: 1 
      }
    });
  }

  return (
    <SharedSearchForm
      id='search-form'
      label={'Search for broad subject terms or database by name.'}
      ariaLabel={'Find your online resource'}
      onSubmit={handleSubmit}
      autoSuggestInputId={'search-form__search-input'}
      autoSuggestAriaLabel={'Search online resources'}
      suggestions={suggestions}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      autoSuggestInputValue={autoSuggestInputValue}
      inputOnChange={inputOnChange}
      suggestionContainerMsg={'You searched for:'}
      searchButtonId={'search-form__submit'}
    >
      <div id="placeholder-children-prop-filters"></div>
    </SharedSearchForm>
  );
};

export default SearchForm;