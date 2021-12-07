import React, { useContext } from "react";
import { Heading, TextInput } from "@nypl/design-system-react-components";
import s from "./../RequestVisitForm.module.css";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

function ContactInfoFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  return (
    <div className={s.contactInfo}>
      <Heading id="contact-info" level={2} text="Your Contact Information" />
      <TextInput
        attributes={{
          name: "contactName",
          //onBlur: handleChange,
        }}
        labelText="Name"
        placeholder="Enter your name"
        isRequired={true}
        invalidText={errors?.contactName}
        isInvalid={errors.contactName ? true : false}
        onChange={handleChange}
        value={values.contactName}
      />
      <TextInput
        attributes={{
          name: "contactEmail",
          //onBlur: handleChange,
        }}
        labelText="Email"
        placeholder="Enter your email"
        isRequired={true}
        invalidText={errors?.contactEmail}
        isInvalid={errors.contactEmail ? true : false}
        onChange={handleChange}
        value={values.contactEmai}
      />
    </div>
  );
}

export default ContactInfoFormField;
