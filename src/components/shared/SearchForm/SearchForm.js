import React from "react";
// Components
import { Box } from "@nypl/design-system-react-components";
import AutoSuggest from "./../../ds-prototypes/AutoSuggest";
import SearchButton from "./SearchButton";

function SearchForm(props) {
  const {
    id,
    label,
    ariaLabel,
    onSubmit,
    autoSuggestInputId,
    autoSuggestAriaLabel,
    suggestions,
    onSuggestionSelected,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    autoSuggestInputValue,
    suggestionContainerMsg,
    inputOnChange,
    searchButtonId,
    children,
  } = props;

  return (
    <Box className="search__form">
      <form
        id={id}
        role="search"
        aria-label={ariaLabel}
        onSubmit={onSubmit}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <AutoSuggest
          id={autoSuggestInputId}
          label={label}
          autoSuggestAriaLabel={autoSuggestAriaLabel}
          suggestions={suggestions}
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          autoSuggestInputValue={autoSuggestInputValue}
          inputOnChange={inputOnChange}
          suggestionContainerMsg={suggestionContainerMsg}
        />
        <SearchButton id={searchButtonId} />
        {children}
      </form>
    </Box>
  );
}

export default SearchForm;
