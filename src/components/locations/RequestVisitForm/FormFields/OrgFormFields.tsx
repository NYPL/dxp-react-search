import React from "react";
import { Checkbox, TextInput } from "@nypl/design-system-react-components";
import s from "./../RequestVisitForm.module.css";
import { FormField as FormFieldProps } from "./../types";

function OrgFormFields({
  formValues,
  formErrors,
  handleChange,
}: FormFieldProps) {
  return (
    <div className={s.schoolInfo}>
      <TextInput
        labelText="What school or organization are you with?"
        attributes={{
          name: "organization",
        }}
        onChange={handleChange}
        value={formValues.organization}
        disabled={formValues.noSchoolOrOrg}
        required={!formValues.noSchoolOrOrg}
        showLabel
        showOptReqLabel={!formValues.noSchoolOrOrg}
        errorText={formErrors.organization}
        errored={formErrors.organization ? true : false}
      />
      <Checkbox
        checked={formValues.noSchoolOrOrg}
        labelText="I’m not with a school or organization."
        name="noSchoolOrOrg"
        onChange={handleChange}
        showLabel
        errored={formErrors.organization ? true : false}
      />
    </div>
  );
}

export default OrgFormFields;
