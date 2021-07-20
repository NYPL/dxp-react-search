import React from 'react';
// Components
import { Button, Icon } from '@nypl/design-system-react-components';

function SearchButton(props) {
  const { id } = props;

  return (
    <Button
      buttonType="filled"
      id={id}
      mouseDown={false}
      className={'search__form-button'}
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
  );
};

export default SearchButton;
