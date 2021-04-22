import React, { Fragment, useState } from 'react';
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
import AutoSuggest from 'react-autosuggest';

function SearchAutoSuggest({ autoSuggestItems }) {
  // Local state
  const [suggestions, setSuggestions] = useState([]);

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
          dispatch(setAutoSuggestInputValue(value));
          setSuggestions(getSuggestions(autoSuggestItems, value));
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
