import React, { Fragment } from 'react';
// Components
import { default as ReactAutoSuggest } from 'react-autosuggest';

function AutoSuggest(props) {
  const {
    id,
    label,
    autoSuggestAriaLabel,
    suggestions,
    onSuggestionSelected,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    autoSuggestInputValue,
    inputOnChange,
    suggestionContainerMsg
  } = props;

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
          {suggestionContainerMsg} <strong>{query}</strong>
        </div>
      </div>
    );
  }

  // Custom input component to add aria-label.
  function renderInputComponent(inputProps) {
    return (
      <Fragment>
        <label htmlFor={id}>{label}</label>
        <input 
          id={id} 
          name="search" 
          aria-label={autoSuggestAriaLabel} {...inputProps} 
        />
      </Fragment>
    );
  }
  
  function onChange(event, { newValue, method }) {
    inputOnChange(newValue);
  }

  return (
    <ReactAutoSuggest
      suggestions={suggestions.slice(0, 5)}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsClearRequested={() => onSuggestionsClearRequested}
      onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested(value)}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer}
      inputProps={{
        placeholder: '',
        value: autoSuggestInputValue,
        onChange: onChange
      }}
      renderInputComponent={renderInputComponent}
      highlightFirstSuggestion={false}
    />
  );
};

export default AutoSuggest;
