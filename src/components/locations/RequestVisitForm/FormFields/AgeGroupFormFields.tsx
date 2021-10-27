import React from "react";
// Components
import { Checkbox } from "@nypl/design-system-react-components";
// CSS
import s from "./../RequestVisitForm.module.css";
import { FormField as FormFieldProps } from "../types";

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

function AgeGroupFormField({
  formValues,
  formErrors,
  handleChangeCheckboxGroup,
}: FormFieldProps) {
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
            checked={formValues.ageGroup.includes(ageGroupItem.id)}
            showLabel
            errored={formErrors.ageGroup ? true : false}
          />
        </div>
      ))}
      {formErrors.ageGroup && (
        <div
          className="helper-text helper-text--error"
          aria-live="polite"
          aria-atomic="true"
        >
          {formErrors.ageGroup}
        </div>
      )}
    </fieldset>
  );
}

export default AgeGroupFormField;
