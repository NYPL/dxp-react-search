import React, { useEffect, useState } from "react";
// Components
import {
  Button,
  Checkbox,
  Heading,
  HeadingDisplaySizes,
  TextInput,
} from "@nypl/design-system-react-components";
import LibraryFormField from "./FormFields/LibraryFormField";
import VisitTypeFormField from "./FormFields/VisitTypeFormField";
import OrgFormFields from "./FormFields/OrgFormFields";
import AgeGroupFormField from "./FormFields/AgeGroupFormFields";
import {
  FormErrors as FormErrorsType,
  FormValues as FormValuesType,
} from "./types";
import formatRequestVisitEmail from "./../../../utils/formatRequestVisitEmail";
// Next
import { useRouter } from "next/router";
// CSS
import s from "./RequestVisitForm.module.css";

function RequestVisitForm() {
  const [formValues, setFormValues] = useState<FormValuesType>({
    library: "",
    visitType: "",
    organization: "",
    noSchoolOrOrg: false,
    ageGroup: [],
    contactName: "",
    contactEmail: "",
    virtualVisitServices: [],
    virtualVisitServicesOther: "",
    inPersonServices: "",
    inPersonServicesOther: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrorsType>({});

  const router = useRouter();
  // Set the selected library to query param on initial render.
  useEffect(() => {
    if (router.query.id) {
      setFormValues({
        ...formValues,
        library: router.query.id as string,
      });
    }
  }, []);

  /*useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
    }
  }, []);
  */

  function handleChange(event: any) {
    const name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    // Special handling for organization
    if (name === "organization" && event.target.type === "checkbox") {
      value = !event.target.checked;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });

    /*setFormErrors({
      ...formErrors,
      //[name]: [],
    });
    */
  }

  function handleCheckboxGroupChange(parentId: string, itemId: string) {
    let items = [];
    // @ts-ignore
    let itemExists = formValues[parentId].includes(itemId);
    // Make a copy of the existing array.
    // @ts-ignore
    items = formValues[parentId].slice();
    // If item exists, remove it from the array.
    if (itemExists) {
      // @ts-ignore
      items = items.filter((id) => id != itemId);
    } else {
      // Add it to the array, but modify the copy, not the original.
      items.push(itemId);
    }

    setFormValues({
      ...formValues,
      // @ts-ignore
      ...formValues[parentId],
      [parentId]: items,
    });
  }

  function validate() {
    let errors = {} as FormErrorsType;

    if (!formValues.library) {
      errors.library = "Please select a library for your visit.";
    }
    if (!formValues.visitType) {
      errors.visitType = "Visit type is required.";
    }
    if (
      formValues.virtualVisitServices.length === 0 &&
      !formValues.virtualVisitServicesOther &&
      formValues.inPersonServices.length === 0 &&
      !formValues.inPersonServicesOther
    ) {
      errors.virtualVisitServices =
        "Please select what services you would like to request";
      errors.inPersonServices =
        "Please select what services you would like to request";
    }
    // Organization
    if (!formValues.organization && !formValues.noSchoolOrOrg) {
      errors.organization = "This field is required.";
    }

    if (formValues.ageGroup !== null && !formValues.ageGroup.length) {
      errors.ageGroup = "Please select your age group.";
    }
    // Contact info
    if (!formValues.contactName) {
      errors.contactName = "Please enter your full name.";
    }
    if (!formValues.contactEmail) {
      errors.contactEmail = "Please enter your email address.";
    }

    if (Object.keys(errors).length === 0) {
      return true;
    }

    setFormErrors(errors);

    return false;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    // @TODO this is wrong, state is update
    //console.log("yo");

    // Check for any validation errors in the form errors formValues.
    if (validate()) {
      //alert("Form submit!");

      // Send email.
      const res = await fetch("/api/send-email", {
        body: JSON.stringify({
          toEmail: "william.luisi2477@gmail.com",
          emailBody: formatRequestVisitEmail(formValues),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        // If there was an error, update the message in formValues.
        //setMessage(error);

        return;
      }

      // Redirect to confirmation page.
    } else {
      alert("Form error!");
    }

    window.scrollTo(0, 0);
  }

  return (
    <form className={s.requestAVisit} onSubmit={handleSubmit}>
      <Heading
        id="your-visit"
        displaySize={HeadingDisplaySizes.Secondary}
        level={2}
        text="Your Visit"
      />
      <LibraryFormField
        formValues={formValues}
        formErrors={formErrors}
        handleChange={handleChange}
      />
      <VisitTypeFormField
        formValues={formValues}
        formErrors={formErrors}
        handleChange={handleChange}
        handleCheckboxGroupChange={handleCheckboxGroupChange}
      />
      <OrgFormFields
        formValues={formValues}
        formErrors={formErrors}
        handleChange={handleChange}
      />
      <AgeGroupFormField
        formValues={formValues}
        formErrors={formErrors}
        handleCheckboxGroupChange={handleCheckboxGroupChange}
      />
      <div className={s.contactInfo}>
        <Heading id="contact-info" level={2} text="Your Contact Information" />
        <TextInput
          attributes={{
            name: "contactName",
          }}
          labelText="Name"
          placeholder="Enter your name"
          required={true}
          errorText={formErrors.contactName}
          errored={formErrors.contactName ? true : false}
          onChange={handleChange}
          value={formValues.contactName}
        />
        <TextInput
          attributes={{
            name: "contactEmail",
          }}
          labelText="Email"
          placeholder="Enter your email"
          required={true}
          errorText={formErrors.contactEmail}
          errored={formErrors.contactEmail ? true : false}
          onChange={handleChange}
          value={formValues.contactEmail}
        />
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <pre>FormErrors State: {JSON.stringify(formErrors, null, 2)}</pre>
      <pre>Form Errors Length: {Object.keys(formErrors).length}</pre>
    </form>
  );
}

export default RequestVisitForm;
