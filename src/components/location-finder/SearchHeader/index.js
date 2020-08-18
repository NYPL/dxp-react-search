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
        <h1 id="location-finder__title">{title}</h1>
        <div>{description}</div>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchHeader;
