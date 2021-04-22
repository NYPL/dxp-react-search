import React, { useEffect, useState } from 'react';
// Components
import { Button, Checkbox, Icon } from '@nypl/design-system-react-components';
import AutoSuggest from './../AutoSuggest';

/*
  PROPS:
  id
  label
  onSubmit
*/
function SearchForm(props) {
  const {
    id,
    label,
    onSubmit,
    suggestions,
    onSuggestionSelected,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    autoSuggestInputValue,
    inputOnChange,
    children
  } = props;

  return (
    <div className='search__form'>
      <form
        role='search'
        aria-label={label}
        onSubmit={onSubmit}
      >
        <AutoSuggest
          label={label}
          suggestions={suggestions}
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          autoSuggestInputValue={autoSuggestInputValue}
          inputOnChange={inputOnChange}
        />
        <Button
          buttonType="filled"
          id="button"
          mouseDown={false}
          type="submit"
        >
          <Icon
            decorative
            modifiers={[
              'small',
              'icon-left'
            ]}
            name="search"
          />
          Search
        </Button>
        {children}
      </form>
    </div>
  );
};

export default SearchForm;
