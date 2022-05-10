import React, { useState } from "react";
import { Icon } from "@nypl/design-system-react-components";
import FocusTrap from "focus-trap-react";

function Dropdown(props) {
  const { id, label, children, checked, onChange, hasSelectedItems } = props;

  return (
    <div
      className={hasSelectedItems ? `dropdown hasSelectedItems` : `dropdown`}
    >
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
          returnFocusOnDeactivate: false,
        }}
        active={checked}
      >
        <div>
          <input
            id={`dropdown-${id}`}
            type="checkbox"
            className="dropdown__input"
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={`dropdown-${id}`} className="dropdown__label">
            <span className="dropdown-label">{label}</span>
            <Icon
              decorative={true}
              name="minus"
              size="small"
              className="icon--minus"
            />
            <Icon
              decorative={true}
              name="plus"
              size="small"
              className="icon--plus"
            />
          </label>
          <div className="dropdown__content">{children}</div>
        </div>
      </FocusTrap>
    </div>
  );
}

export default Dropdown;
