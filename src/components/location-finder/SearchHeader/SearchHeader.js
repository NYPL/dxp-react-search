import React from 'react';
// Content
import SearchHeaderContent from './content';
// Components
import SearchForm from './../SearchForm';

function SearchHeader() {
  // Content
  const { title } = SearchHeaderContent;

  return (
    <div className='search-header'>
      <div className='search-header__inner'>
        <h1 id="location-finder__title">{title}</h1>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchHeader;
