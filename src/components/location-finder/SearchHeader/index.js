import React from 'react';
// Content
import SearchHeaderContent from './content';
// Components
import * as DS from '@nypl/design-system-react-components';
import SearchForm from './../SearchForm';

function SearchHeader() {
  // Content
  const { title, description } = SearchHeaderContent;

  return (
    <div className='search-header'>
      <div className='search-header__inner'>
        <h2>{title}</h2>
        <div>{description}</div>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchHeader;
