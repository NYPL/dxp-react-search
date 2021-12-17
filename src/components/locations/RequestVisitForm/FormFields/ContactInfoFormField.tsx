import React, { useContext } from "react";
import { Box, Heading, TextInput } from "@nypl/design-system-react-components";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

function ContactInfoFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  return (
    <Box
      my="m"
      // Adds underline to heading. Bad idea?
      sx={{
        "& h2": {
          paddingBottom: "s",
          borderBottom: "1px solid",
          borderColor: "ui.gray.medium",
        },
      }}
    >
      <Heading id="contact-info" level={2} text="Your Contact Information" />
      <Box mb="s">
        <TextInput
          attributes={{
            name: "contactName",
          }}
          labelText="Name"
          placeholder="Enter your name"
          isRequired={true}
          invalidText={errors?.contactName}
          isInvalid={errors.contactName ? true : false}
          onChange={handleChange}
          value={values.contactName}
        />
      </Box>
      <TextInput
        attributes={{
          name: "contactEmail",
        }}
        labelText="Email"
        placeholder="Enter your email"
        isRequired={true}
        invalidText={errors?.contactEmail}
        isInvalid={errors.contactEmail ? true : false}
        onChange={handleChange}
        value={values.contactEmai}
      />
    </Box>
  );
}

export default ContactInfoFormField;
