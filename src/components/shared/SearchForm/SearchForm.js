import React, { useEffect, useState } from 'react';
// Components
import AutoSuggest from './../../ds-prototypes/AutoSuggest';
import SearchButton from  './SearchButton';

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
    inputOnChange,
    searchButtonId,
    children
  } = props;

  return (
    <div className='search__form'>
      <form
        id={id}
        role='search'
        aria-label={ariaLabel}
        onSubmit={onSubmit}
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
        />
        <SearchButton id={searchButtonId} />
        {children}
      </form>
    </div>
  );
};

export default SearchForm;
