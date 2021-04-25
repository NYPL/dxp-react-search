import React, { useEffect, useState } from 'react';
// Components
import { Button, Checkbox, Icon } from '@nypl/design-system-react-components';
import AutoSuggest from './../../ds-prototypes/AutoSuggest';

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
        <div style={{
          'display': 'flex'
        }}>
          {/*<div>
            <label style={{'display': 'block'}}>
              Enter an address or landmark to search nearby or type in a Library name.
            </label>
            <input style={{'width': '100%'}} />
          </div>
          */}
          <AutoSuggest
            label={label}
            suggestions={suggestions}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            autoSuggestInputValue={autoSuggestInputValue}
            inputOnChange={inputOnChange}
          />
          <button style={{
            'align-self': 'flex-end'
          }}>
            Search
          </button>

          <div style={{
            'align-self': 'flex-end'
          }}>
            <input type="checkbox"/>
            <label>Open Now</label>
          </div>

        </div>

        {children}
      </form>
    </div>
  );
};

export default SearchForm;
