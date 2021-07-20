import React from 'react';
// Components
import { Button, Heading } from '@nypl/design-system-react-components';
import s from './SearchResultsDetails.module.css';

function SearchResultsDetails(props) {
  const { label, onClick, message, clearMessage } = props;

  return (
    <div id="search-results__details" role="alert">
      <Heading
        id={'search-results__details-heading'}
        level={2}
        text={label}
      />
      {message}
      <Button
        className={s.button}
        buttonType="link"
        iconName={null}
        iconPosition={null}
        id="search-results__details-button"
        mouseDown={false}
        onClick={onClick}
        type="submit"
      >
        {clearMessage}
      </Button>
    </div>
  );
}

export default SearchResultsDetails;