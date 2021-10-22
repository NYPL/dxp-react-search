import React, { useEffect, useState } from "react";
// Components
import {
  Button,
  Checkbox,
  Heading,
  HeadingDisplaySizes,
  TextInput,
} from "@nypl/design-system-react-components";
import LibraryFormField from "./LibraryFormField";
import VisitTypeFormField from "./VisitTypeFormField";
import AgeGroupFormField from "./AgeGroupFormFields";
import { FormErrors } from "./types";
// Next
import { useRouter } from "next/router";
// CSS
import s from "./RequestVisitForm.module.css";

interface FormState {
  library: string;
  visitType: string;
  organization: string | null;
  noSchoolOrOrg: boolean;
  ageGroup: string[] | null;
  contactName: string;
  contactEmail: string;
  virtualVisitServices: string[] | null;
  virtualVisitServicesOther: boolean | string;
}

function RequestVisitForm() {
  const [state, setState] = useState<FormState>({
    library: "",
    visitType: "",
    organization: "",
    noSchoolOrOrg: false,
    ageGroup: [],
    contactName: "",
    contactEmail: "",
    virtualVisitServices: [],
    virtualVisitServicesOther: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const router = useRouter();
  // Set the selected library to query param on initial render.
  useEffect(() => {
    if (router.query.id) {
      setState({
        ...state,
        library: router.query.id as string,
      });
    }
  }, []);

  function handleChange(event: any) {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleCheckboxGroupChange(parentId: string, itemId: string) {
    let items = [];
    // @ts-ignore
    let itemExists = state[parentId].includes(itemId);
    // Make a copy of the existing array.
    // @ts-ignore
    items = state[parentId].slice();
    // If item exists, remove it from the array.
    if (itemExists) {
      // @ts-ignore
      items = items.filter((id) => id != itemId);
    } else {
      // Add it to the array, but modify the copy, not the original.
      items.push(itemId);
    }

    setState({
      ...state,
      // @ts-ignore
      ...state[parentId],
      [parentId]: items,
    });
  }

  function handleValidation() {
    let errors = {} as FormErrors;

    if (!state.library) {
      errors.library = "Please select a library";
    }
    if (!state.contactName) {
      errors.contactName = "Please enter your full name.";
    }
    if (!state.visitType) {
      errors.visitType = "Please select your visit type.";
    }
    if (state.ageGroup !== null && !state.ageGroup.length) {
      errors.ageGroup = "Please select your age group.";
    }

    setFormErrors(errors);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    handleValidation();

    // Check for any validation errors in the form errors state.
    if (Object.keys(formErrors).length > 0) {
      const emailBody = `
        Library: ${state.library}\n
        Visit Type: ${state.visitType}
      `;

      // Send email.
      const res = await fetch("/api/send-email", {
        body: JSON.stringify({
          // william.luisi2477@gmail.com
          emailBody: emailBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        // If there was an error, update the message in state.
        //setMessage(error);

        return;
      }

      // Redirect to confirmation page.
    }
  }

  return (
    <form className={s.requestAVisit} onSubmit={handleSubmit}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(formErrors, null, 2)}</pre>
      <Heading
        id="your-visit"
        displaySize={HeadingDisplaySizes.Secondary}
        level={2}
        text="Your Visit"
      />
      <LibraryFormField
        formState={state}
        formErrors={formErrors}
        handleChange={handleChange}
      />
      <VisitTypeFormField
        formState={state}
        formErrors={formErrors}
        handleChange={handleChange}
        handleCheckboxGroupChange={handleCheckboxGroupChange}
      />
      <div className={s.schoolInfo}>
        <TextInput
          disabled={state.noSchoolOrOrg}
          labelText="What school or organization are you with?"
          required={!state.noSchoolOrOrg}
          showLabel={true}
          showOptReqLabel={!state.noSchoolOrOrg}
        />
        <Checkbox
          checked={state.noSchoolOrOrg}
          labelText="I’m not with a school or organization."
          name="noSchoolOrOrg"
          onChange={(e) => handleChange(e)}
          showLabel
        />
      </div>
      <AgeGroupFormField
        formState={state}
        formErrors={formErrors}
        handleCheckboxGroupChange={handleCheckboxGroupChange}
      />
      <div className={s.contactInfo}>
        <Heading
          id="contact-info"
          displaySize={HeadingDisplaySizes.Secondary}
          level={2}
          text="Your Contact Information"
        />
        <TextInput
          attributes={{
            name: "contactName",
          }}
          labelText="Name"
          placeholder="Enter your name"
          required={true}
          errorText={formErrors.contactName}
          // @ts-ignore
          errored={formErrors.contactName}
          onChange={handleChange}
          value={state.contactName}
        />
        <TextInput
          attributes={{
            name: "contactEmail",
          }}
          labelText="Email"
          placeholder="Enter your email"
          showOptReqLabel={false}
          onChange={handleChange}
          value={state.contactEmail}
        />
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default RequestVisitForm;

/*
virtualVisitServices: [
  "services-introduction",
  "services-registration",
  "services-other": [
     "User entered value here"
  ]
]

services-introduction
services-registration
services-resources
services-other

*/
