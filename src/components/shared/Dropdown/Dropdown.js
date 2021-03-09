import React, { useState } from 'react';
import { Icon } from '@nypl/design-system-react-components';
import FocusTrap from 'focus-trap-react';

/*
  props
  -----
  id
  label
  openDirection
  children
*/
function Dropdown(props) {
  return (
    <div className="dropdown">
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
          returnFocusOnDeactivate: false,
        }}
        active={props.checked}
      >
        <div>
          <input
            id={`dropdown-${props.id}`}
            type="checkbox"
            className="dropdown__input"
            checked={props.checked}
            onChange={props.onChange}
          />
          <label
            htmlFor={`dropdown-${props.id}`}
            className="dropdown__label"
          >
            <span className="dropdown-label">{props.label}</span>
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
      </FocusTrap>
    </div>
  );
};

export default Dropdown;
