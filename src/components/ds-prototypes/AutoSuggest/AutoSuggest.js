import React, { Fragment } from "react";
// Components
import { default as ReactAutoSuggest } from "react-autosuggest";
import { TextInput } from "@nypl/design-system-react-components";

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
    suggestionContainerMsg,
  } = props;

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  function renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>;
  }

  function renderSuggestionsContainer({ containerProps, children, query }) {
    return (
      <div {...containerProps} aria-label="Filter search">
        {children}
        <div className="auto-suggest-bottom">
          {suggestionContainerMsg} <strong>{query}</strong>
        </div>
      </div>
    );
  }

  // Custom input component to add aria-label.
  function renderInputComponent(inputProps) {
    return (
      <TextInput
        id={id}
        name="search"
        labelText={label}
        showRequiredLabel={false}
        aria-label={autoSuggestAriaLabel}
        {...inputProps}
      />
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
      onSuggestionsFetchRequested={({ value }) =>
        onSuggestionsFetchRequested(value)
      }
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer}
      inputProps={{
        placeholder: "",
        value: autoSuggestInputValue,
        onChange: onChange,
      }}
      renderInputComponent={renderInputComponent}
      highlightFirstSuggestion={false}
    />
  );
}

export default AutoSuggest;
