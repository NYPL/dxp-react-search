import React, { useContext } from "react";
// Components
import { Checkbox, CheckboxGroup } from "@nypl/design-system-react-components";
// CSS
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

const ageGroupItems = [
  {
    id: "age-children",
    label: "Kids",
  },
  {
    id: "age-teenagers",
    label: "Teens",
  },
  {
    id: "age-adults",
    label: "Adults",
  },
];

function AgeGroupFormField({ handleChangeCheckboxGroup }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors } = state;

  return (
    <CheckboxGroup
      id="age-group"
      name="age-group"
      labelText="What age range is your group?"
      showLabel
      showRequiredLabel={false}
      isRequired
      isInvalid={errors.ageGroup ? true : false}
      invalidText={errors.ageGroup}
    >
      {ageGroupItems.map((ageGroupItem) => (
        <Checkbox
          id={ageGroupItem.id}
          labelText={ageGroupItem.label}
          name={ageGroupItem.id}
          isChecked={values.ageGroup.includes(ageGroupItem.id)}
          showLabel
          onChange={() =>
            handleChangeCheckboxGroup("ageGroup", ageGroupItem.id)
          }
          isInvalid={errors.ageGroup ? true : false}
        />
      ))}
    </CheckboxGroup>
  );

  /*return (
    <Fieldset showRequiredLabel={false} legendText="What age range is your group?">
      {ageGroupItems.map((ageGroupItem) => (
        <Box mb="s">
          <Checkbox
            labelText={ageGroupItem.label}
            name={ageGroupItem.id}
            onChange={(e) =>
              handleChangeCheckboxGroup("ageGroup", ageGroupItem.id)
            }
            isChecked={values.ageGroup.includes(ageGroupItem.id)}
            showLabel
            isInvalid={errors.ageGroup ? true : false}
          />
        </Box>
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
    </Fieldset>
  );
  */
}

export default AgeGroupFormField;
