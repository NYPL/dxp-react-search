import React, { useContext } from "react";
import {
  FormContext,
  FormContextActionType,
} from "../../../../context/FormContext";

function HoneypotFormField() {
  const [state, dispatch] = useContext(FormContext);
  const { values } = state;
  const id = "notHoom";

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
          onChange={(e) => {
            dispatch({
              type: FormContextActionType.SET_FORM_STATE,
              payload: {
                values: { ...state.values, [e.target.name]: e.target.value },
                touched: { ...state.touched, [e.target.name]: true },
              },
            });
          }}
          checked={values[id]}
        />
      </label>
    </div>
  );
}

export default HoneypotFormField;
