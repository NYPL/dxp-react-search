import React, { useContext } from "react";
import { Box, Checkbox, TextInput } from "@nypl/design-system-react-components";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

function OrgFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  return (
    <>
      <Box mb="s">
        <TextInput
          id="organization"
          labelText="Please tell us about your school or organization"
          attributes={{
            name: "organization",
          }}
          onChange={handleChange}
          value={values.organization}
          isDisabled={values.noSchoolOrOrg}
          isRequired={!values.noSchoolOrOrg}
          showLabel
          placeholder="Enter school or organization name"
          showRequiredLabel={!values.noSchoolOrOrg}
          invalidText={errors.organization}
          isInvalid={errors.organization ? true : false}
        />
      </Box>
      <Checkbox
        id="noSchoolOrOrg"
        isChecked={values.noSchoolOrOrg}
        labelText="I’m not with a school or organization."
        name="noSchoolOrOrg"
        onChange={handleChange}
        showLabel
        isInvalid={errors.organization ? true : false}
      />
    </>
  );
}

export default OrgFormField;
