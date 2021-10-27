import React, { useContext, useEffect, useState } from "react";
// Apollo
import { useApolloClient, gql } from "@apollo/client";
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

import { FormContext } from "./../../../context/FormContext";
// Form validation
import * as yup from "yup";
import {
  checkValidation,
  runValidation,
} from "./../../../utils/formValidation";

const schema = yup.object().shape({
  library: yup.string().required("Please select a library for your visit."),
  contactName: yup.string().required("Please enter your full name."),
  contactEmail: yup
    .string()
    .email()
    .required("Please enter your email address."),
  organization: yup.string().when("noSchoolOrOrg", {
    is: false,
    then: yup.string().required("This field is required."),
  }),
  noSchoolOrOrg: yup.boolean(),
  ageGroup: yup
    .array()
    .min(1, "Please select your age group.")
    .required("Please select your age group."),
});

function RequestVisitForm() {
  // @ts-ignore
  const [state, dispatch] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  // Apollo.
  const client = useApolloClient();
  const router = useRouter();

  async function handleChange(event: any) {
    const name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    // Special handling for organization
    if (name === "organization" && event.target.type === "checkbox") {
      value = !event.target.checked;
    }

    const schemaErrors = await runValidation(schema, {
      ...state.values,
      [name]: value,
    });

    dispatch({
      type: "SET_FORM_STATE",
      payload: {
        errors: schemaErrors,
        values: { ...state.values, [name]: value },
        touched: { ...state.touched, [name]: true },
        isValid: checkValidation(schemaErrors),
      },
    });
  }

  async function handleChangeCheckboxGroup(parentId: string, itemId: string) {
    let items = [];
    // @ts-ignore
    let itemExists = values[parentId].includes(itemId);
    // Make a copy of the existing array.
    // @ts-ignore
    items = values[parentId].slice();
    // If item exists, remove it from the array.
    if (itemExists) {
      // @ts-ignore
      items = items.filter((id) => id != itemId);
    } else {
      // Add it to the array, but modify the copy, not the original.
      items.push(itemId);
    }

    dispatch({
      type: "SET_FORM_STATE",
      payload: {
        //errors: schemaErrors,
        values: { ...state.values, [parentId]: items },
        touched: { ...state.touched /*[name]: true*/ },
        //isValid: checkValidation(schemaErrors),
      },
    });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    // Run the form validation.
    const schemaErrors = await runValidation(schema, {
      ...state.values,
    });
    dispatch({
      type: "SET_FORM_STATE",
      payload: {
        errors: schemaErrors,
        values: { ...state.values },
        touched: { ...state.touched },
        isValid: checkValidation(schemaErrors),
        isSubmitted: true,
      },
    });

    if (state.isValid) {
      console.log("Submit form!");
      const response = await locationEmailDataRequest(client);
      const emailTo = response.data?.allLocations?.items[0]?.email;

      const sendEmailResponse = await fetch("/api/send-email", {
        body: JSON.stringify({
          emailTo: emailTo,
          emailCc: null,
          //emailBody: formatRequestVisitEmail(values),
          emailBody: "<div>TEST!</div>",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!sendEmailResponse.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      // Redirect to confirmation pg.
      router.push({
        pathname: `/locations/request-visit/confirmation`,
      });
    } else {
      console.log("Form error");
    }
    // Scroll back to top after form submit.
    window.scrollTo(0, 0);
  }

  function locationEmailDataRequest(apolloClient: any) {
    const LOCATION_EMAIL_QUERY = gql`
      query LocationEmailQuery(
        $internalSlug: [String]
        $contentType: String
        $limit: Int
        $pageNumber: Int
      ) {
        allLocations(
          contentType: $contentType
          limit: $limit
          pageNumber: $pageNumber
          filter: { internalSlug: $internalSlug }
        ) {
          items {
            id
            name
            internalSlug
            email
          }
          pageInfo {
            limit
            totalItems
          }
        }
      }
    `;
    let internalSlugArray = [];
    internalSlugArray.push(values.library);

    return apolloClient.query({
      query: LOCATION_EMAIL_QUERY,
      variables: {
        contentType: "library",
        limit: 1,
        pageNumber: 1,
        internalSlug: internalSlugArray,
      },
    });
  }

  return (
    <>
      {isSubmitted &&
        !state.isValid &&
        Object.keys(state.errors).length > 0 && (
          <div>
            There was a problem with your submissions. Errors have been
            highlighted below.
          </div>
        )}
      <form className={s.requestAVisit} onSubmit={handleSubmit}>
        <Heading
          id="your-visit"
          displaySize={HeadingDisplaySizes.Secondary}
          level={2}
          text="Your Visit"
        />
        <LibraryFormField
          formValues={values}
          formErrors={errors}
          handleChange={handleChange}
        />
        <OrgFormFields
          formValues={values}
          formErrors={errors}
          handleChange={handleChange}
        />
        <AgeGroupFormField
          formValues={values}
          formErrors={errors}
          handleChangeCheckboxGroup={handleChangeCheckboxGroup}
        />
        <div className={s.contactInfo}>
          <Heading
            id="contact-info"
            level={2}
            text="Your Contact Information"
          />
          <TextInput
            attributes={{
              name: "contactName",
              onBlur: handleChange,
            }}
            labelText="Name"
            placeholder="Enter your name"
            required={true}
            errorText={touched.contactName && errors?.contactName}
            errored={touched.contactName && errors.contactName ? true : false}
            onChange={handleChange}
            value={values.contactName}
          />
          <TextInput
            attributes={{
              name: "contactEmail",
              onBlur: handleChange,
            }}
            labelText="Email"
            placeholder="Enter your email"
            required={true}
            errorText={touched.contactEmail && errors?.contactEmail}
            errored={touched.contactEmail && errors.contactEmail ? true : false}
            onChange={handleChange}
            value={values.contactEmai}
          />
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>

        <pre>{JSON.stringify(state, null, 2)}</pre>
      </form>
    </>
  );
}

export default RequestVisitForm;
