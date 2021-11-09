import React, { useContext } from "react";
import { FormFieldProps } from "../types";
import { FormContext } from "../../../../context/FormContext";

function HoneypotFormField() {
  // @ts-ignore
  const [state, dispatch] = useContext(FormContext);
  const { values } = state;
  const id = "notHoom";

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.checked;

    dispatch({
      type: "SET_FORM_STATE",
      payload: {
        values: { ...state.values, [name]: value },
        touched: { ...state.touched, [name]: true },
      },
    });
  }

  return (
    <div hidden>
      <label htmlFor={id} aria-hidden="true">
        Leave the following field empty:
        <input
          type="checkbox"
          name={id}
          id={id}
          style={{
            display: "none",
          }}
          onChange={handleChange}
          checked={values[id]}
        />
      </label>
    </div>
  );
}

export default HoneypotFormField;
