import React from 'react';

function Checkbox(props) {
  const { id, name, checked, children, onChange } = props;
  return (
    <div className="checkbox">
      <input
        id={id}
        className="input__checkbox"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        aria-label="Checking this box will update the results"
      />
      <label
        id={`label-${id}`}
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
