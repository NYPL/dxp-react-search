import React, { useContext } from "react";
import { Box, TextInput } from "@nypl/design-system-react-components";
import Heading from "../../../shared/Heading";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

function ContactInfoFormField({ handleChange }: FormFieldProps) {
  const [state] = useContext(FormContext);
  const { values, errors } = state;

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
      <Heading id="contact-info" level="h2">
        Your Contact Information
      </Heading>
      <Box mb="s">
        <TextInput
          id="contactName"
          name="contactName"
          labelText="Name"
          placeholder="Enter your name"
          isRequired={true}
          invalidText={errors?.contactName}
          isInvalid={errors?.contactName ? true : false}
          onChange={handleChange}
          value={values.contactName}
        />
      </Box>
      <TextInput
        id="contactEmail"
        name="contactEmail"
        labelText="Email"
        placeholder="Enter your email"
        isRequired={true}
        invalidText={errors?.contactEmail}
        isInvalid={errors?.contactEmail ? true : false}
        onChange={handleChange}
        value={values.contactEmail}
      />
    </Box>
  );
}

export default ContactInfoFormField;
