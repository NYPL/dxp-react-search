import React from 'react';

function Checkbox(props) {
  const { checkboxId, name, checked, children, onChange } = props;
  return (
    <div className="checkbox">
      <input
        id={checkboxId}
        className="checkbox__input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        aria-label="Checking this box will update the results"
      />
      <label
        id={`label-${checkboxId}`}
        htmlFor={name}
        className="label"
      >
        {name}
      </label>
      {children}
    </div>
  );
};

export default Checkbox;
