import React, { Fragment } from 'react';

function SearchHeader(props) {
  const { children, title, titleId } = props;

  return (
    <div className='search-header'>
      <div className='search-header__inner'>
        {title &&
          <h1 id={titleId} className="search-header__title">{title}</h1>
        }
        {children}
      </div>
    </div>
  );
};

export default SearchHeader;