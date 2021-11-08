import React, { useContext } from "react";
import { FormFieldProps } from "../types";
import { FormContext } from "../../../../context/FormContext";

function HoneypotFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values } = state;

  return (
    <div hidden>
      <label htmlFor="honeypot" aria-hidden="true">
        Leave the following field empty:
        <input
          type="radio"
          name="honeypot"
          id="honeypot"
          style={{
            display: "none",
          }}
          onChange={handleChange}
          value={values.honeypot}
        />
      </label>
    </div>
  );
}

export default HoneypotFormField;
