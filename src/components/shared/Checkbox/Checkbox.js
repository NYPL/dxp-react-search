import React from 'react';

function Checkbox(props) {
  const { id, name, checked, onChange } = props;
  return (
    <div className="checkbox">
      <input
        id={id}
        className="checkbox__input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        aria-label="Checking this box will update the results"
      />
      <label
        id="label"
        htmlFor={name}
        className="label"
      >
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
