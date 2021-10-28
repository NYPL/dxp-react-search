import React, { useContext, useEffect, useState } from "react";
// Apollo
import { useApolloClient } from "@apollo/client";
// @ts-ignore
import { LocationByInternalSlugQuery as LOCATION_BY_INTERNAL_SLUG } from "./../../../apollo/client/queries/LocationByInternalSlug.gql";
// Components
import {
  Button,
  Heading,
  HeadingDisplaySizes,
} from "@nypl/design-system-react-components";
import LibraryFormField from "./FormFields/LibraryFormField";
import VisitTypeFormField from "./FormFields/VisitTypeFormField";
import OrgFormField from "./FormFields/OrgFormField";
import AgeGroupFormField from "./FormFields/AgeGroupFormField";
import ContactInfoFormField from "./FormFields/ContactInfoFormField";
import formatRequestVisitEmail from "./../../../utils/formatRequestVisitEmail";
import { useRouter } from "next/router";
import { FormContext } from "./../../../context/FormContext";
// Form validation
import * as yup from "yup";
import {
  checkValidation,
  runValidation,
} from "./../../../utils/formValidation";
import s from "./RequestVisitForm.module.css";

/*
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

*/

// @TODO Move this to a seperate file?
const schema = yup.object().shape({
  library: yup.string().required("Please select a library for your visit."),
  visitType: yup.string().required("Visit type is required."),
  virtualVisitServicesOther: yup.string(),
  // @TODO clean this up maybe, logic seems insane?
  virtualVisitServices: yup
    .array()
    .min(1, "Please select what services you would like to request")
    .when("virtualVisitServicesOther", {
      is: "",
      then: yup
        .array()
        .min(1, "Please select what services you would like to request")
        .required(),
    }),
  organization: yup.string().when("noSchoolOrOrg", {
    is: false,
    then: yup.string().required("This field is required."),
  }),
  noSchoolOrOrg: yup.boolean(),
  ageGroup: yup
    .array()
    .min(1, "Please select your age group.")
    .required("Please select your age group."),
  contactName: yup.string().required("Please enter your full name."),
  contactEmail: yup
    .string()
    .email()
    .required("Please enter your email address."),
});

function RequestVisitForm() {
  // @ts-ignore
  const [state, dispatch] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  // Apollo.
  const client = useApolloClient();
  const router = useRouter();

  // Set the selected library to query param on initial render.
  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: "SET_FORM_STATE",
        payload: {
          values: { ...state.values, library: router.query.id as string },
        },
      });
    }
  }, []);

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

    /*const schemaErrors = await runValidation(schema, {
      ...state.values,
      [name]: value,
    });
    */

    dispatch({
      type: "SET_FORM_STATE",
      payload: {
        //errors: schemaErrors,
        values: { ...state.values, [name]: value },
        touched: { ...state.touched, [name]: true },
        //isValid: checkValidation(schemaErrors),
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
      const locationInternalSlug =
        response.data?.allLocations?.items[0]?.internalSlug;

      const sendEmailResponse = await fetch("/api/send-email", {
        body: JSON.stringify({
          emailTo: emailTo,
          emailCc: null,
          emailBody: formatRequestVisitEmail(values),
          //emailBody: "<div>TEST!</div>",
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
        query: {
          id: locationInternalSlug,
        },
      });
    } else {
      console.log("Form error");
      // Scroll back to top after form submit.
      window.scrollTo(0, 0);
    }
  }

  function locationEmailDataRequest(apolloClient: any) {
    let internalSlugArray = [];
    internalSlugArray.push(values.library);

    return apolloClient.query({
      query: LOCATION_BY_INTERNAL_SLUG,
      variables: {
        contentType: "library",
        limit: 1,
        pageNumber: 1,
        internalSlug: internalSlugArray,
      },
    });
  }

  return (
    <form className={s.requestAVisit} onSubmit={handleSubmit} noValidate>
      <Heading
        id="your-visit"
        displaySize={HeadingDisplaySizes.Secondary}
        level={2}
        text="Your Visit"
      />
      <LibraryFormField handleChange={handleChange} />
      <VisitTypeFormField
        handleChange={handleChange}
        handleChangeCheckboxGroup={handleChangeCheckboxGroup}
      />
      <OrgFormField handleChange={handleChange} />
      <AgeGroupFormField
        handleChangeCheckboxGroup={handleChangeCheckboxGroup}
      />
      <ContactInfoFormField handleChange={handleChange} />
      <Button type="submit">Submit</Button>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
}

export default RequestVisitForm;
