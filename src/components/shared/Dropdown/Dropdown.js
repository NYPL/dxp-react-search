import React from 'react';
import { Icon } from '@nypl/design-system-react-components';

/*
  props
  -----
  id
  label
  children
*/
function Dropdown(props) {
  /*function onChangeFilters(event) {
    dispatch(setFilters({
      searchFilters: event.target.id
    }));
  }
  */

  return (
    <div className="dropdown">
      <input
        id={`dropdown-${props.id}`}
        type="checkbox"
        className="dropdown__input"
      />
      <label
        htmlFor={`dropdown-${props.id}`}
        className="dropdown__label"
      >
        {props.label}
        <Icon
          decorative={true}
          name="minus"
          modifiers={["small", "minus"]}
        />
        <Icon
          decorative={true}
          name="plus"
          modifiers={["small", "plus"]}
        />
      </label>
      <div className="dropdown__content">
        {props.children}
      </div>
    </div>
  );
};

export default Dropdown;
