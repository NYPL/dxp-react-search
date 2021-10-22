import React from "react";
// Components
import { Checkbox } from "@nypl/design-system-react-components";
// CSS
import s from "./RequestVisitForm.module.css";
import { FormField as FormFieldProps } from "./types";

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
  formState,
  formErrors,
  handleCheckboxGroupChange,
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
              handleCheckboxGroupChange("ageGroup", ageGroupItem.id)
            }
            // @ts-ignore
            checked={formState.ageGroup.includes(ageGroupItem.id)}
            showLabel
          />
        </div>
      ))}
    </fieldset>
  );
}

export default AgeGroupFormField;
