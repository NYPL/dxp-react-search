import React, { useContext } from "react";
import { Checkbox, TextInput } from "@nypl/design-system-react-components";
import s from "./../RequestVisitForm.module.css";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

function OrgFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  return (
    <div className={s.schoolInfo}>
      <TextInput
        labelText="Please tell us about your school or organization"
        attributes={{
          name: "organization",
        }}
        onChange={handleChange}
        value={values.organization}
        disabled={values.noSchoolOrOrg}
        required={!values.noSchoolOrOrg}
        showLabel
        placeholder="Enter school or organization name"
        showOptReqLabel={!values.noSchoolOrOrg}
        errorText={errors.organization}
        errored={errors.organization ? true : false}
      />
      <Checkbox
        checked={values.noSchoolOrOrg}
        labelText="I’m not with a school or organization."
        name="noSchoolOrOrg"
        onChange={handleChange}
        showLabel
        errored={errors.organization ? true : false}
      />
    </div>
  );
}

export default OrgFormField;
