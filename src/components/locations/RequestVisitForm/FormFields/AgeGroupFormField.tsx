import React, { useContext } from "react";
// Components
import { Checkbox } from "@nypl/design-system-react-components";
// CSS
import s from "./../RequestVisitForm.module.css";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

const ageGroupItems = [
  {
    id: "age-children",
    label: "Children (Pre-K to 5th Grade)",
  },
  {
    id: "age-teenagers",
    label: "Teenagers (6th Grade to 12th Grade)",
  },
  {
    id: "age-adults",
    label: "Adults (18+)",
  },
];

function AgeGroupFormField({ handleChangeCheckboxGroup }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  return (
    <fieldset>
      <legend>What age or grade is your group?</legend>
      {ageGroupItems.map((ageGroupItem) => (
        <div className={s.checkBox}>
          <Checkbox
            labelText={ageGroupItem.label}
            name={ageGroupItem.id}
            onChange={(e) =>
              handleChangeCheckboxGroup("ageGroup", ageGroupItem.id)
            }
            // @ts-ignore
            checked={values.ageGroup.includes(ageGroupItem.id)}
            showLabel
            errored={errors.ageGroup ? true : false}
          />
        </div>
      ))}
      {errors.ageGroup && (
        <div
          className="helper-text helper-text--error"
          aria-live="polite"
          aria-atomic="true"
        >
          {errors.ageGroup}
        </div>
      )}
    </fieldset>
  );
}

export default AgeGroupFormField;
