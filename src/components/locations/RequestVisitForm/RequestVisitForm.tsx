import React, { useContext, useEffect } from "react";
// Apollo
import { gql, useApolloClient } from "@apollo/client";
// Components
import { Box, Button, Heading } from "@nypl/design-system-react-components";
import LibraryFormField from "./FormFields/LibraryFormField";
import VisitTypeFormField from "./FormFields/VisitTypeFormField";
import OrgFormField from "./FormFields/OrgFormField";
import AgeGroupFormField, {
  FormCheckboxGroupType,
  FormCheckboxValueType,
} from "./FormFields/AgeGroupFormField";
import ContactInfoFormField from "./FormFields/ContactInfoFormField";
import HoneypotFormField from "./FormFields/HoneypotFormField";
import formatRequestVisitEmail from "./../../../utils/formatRequestVisitEmail";
import { useRouter } from "next/router";
import {
  FormContext,
  FormContextActionType,
} from "./../../../context/FormContext";
// Form validation
import * as yup from "yup";
import {
  checkValidation,
  runValidation,
} from "./../../../utils/formValidation";

export const LOCATION_BY_INTERNAL_SLUG = gql`
  query LocationByInternalSlugQuery(
    $contentType: String
    $limit: Int
    $pageNumber: Int
    $filter: LocationFilter
    $sort: Sort
  ) {
    allLocations(
      contentType: $contentType
      limit: $limit
      pageNumber: $pageNumber
      filter: $filter
      sort: $sort
    ) {
      items {
        id
        name
        internalSlug
        email
        url
      }
      pageInfo {
        limit
        totalItems
      }
    }
  }
`;

const SEND_EMAIL_MUTATION = gql`
  mutation ($emailTo: String!, $emailCc: String, $emailBody: String) {
    sendEmail(
      input: { emailTo: $emailTo, emailCc: $emailCc, emailBody: $emailBody }
    ) {
      statusCode
      message
      emailEnable
      formData {
        emailTo
        emailCc
        emailBody
      }
    }
  }
`;

// @TODO Move this to a seperate file?
const schema = yup.object().shape({
  library: yup.string().required("Please select a library for your visit."),
  visitType: yup.string().required("Visit type is required."),
  virtualVisitServicesOther: yup.string(),
  virtualVisitServices: yup.array().when(["inPersonServices"], {
    is: (inPersonServices: string) => inPersonServices === "",
    then: yup
      .array()
      .min(1, "Please select what virtual services you would like to request.")
      .required(),
  }),
  inPersonServicesOther: yup.string(),
  inPersonServices: yup.string().when(["visitType", "inPersonServicesOther"], {
    is: (visitType: string, inPersonServicesOther: string) =>
      visitType === "in-person" && inPersonServicesOther === "",
    then: yup
      .string()
      .required(
        "Please select what in person services you would like to request."
      ),
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
  contactName: yup.string().required("Your name is required."),
  contactEmail: yup.string().email().required("Email is required."),
  notHoom: yup.bool().oneOf([false], "This field must be left blank"),
});

function RequestVisitForm() {
  const [state, dispatch] = useContext(FormContext);
  const { values } = state;
  // Apollo.
  const client = useApolloClient();
  const router = useRouter();

  // Set the selected library to query param on initial render.
  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: FormContextActionType.SET_FORM_STATE,
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

    dispatch({
      type: FormContextActionType.SET_FORM_STATE,
      payload: {
        values: { ...state.values, [name]: value },
        touched: { ...state.touched, [name]: true },
      },
    });
  }

  async function handleChangeCheckboxGroup(
    parentId: FormCheckboxGroupType,
    itemId: FormCheckboxValueType
  ) {
    let itemExists = values[parentId]?.includes(itemId) || false;
    // Make a copy of the existing array.
    let items = values[parentId]?.slice() || [];
    // If item exists, remove it from the array.
    if (itemExists) {
      items = items.filter((id) => id != itemId);
    } else {
      // Add it to the array, but modify the copy, not the original.
      items.push(itemId);
    }

    dispatch({
      type: FormContextActionType.SET_FORM_STATE,
      payload: {
        values: { ...state.values, [parentId]: items },
        touched: { ...state.touched },
      },
    });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    // Run the form validation.
    const schemaErrors = await runValidation(schema, {
      ...state.values,
    });
    // Set the form state.
    dispatch({
      type: FormContextActionType.SET_FORM_STATE,
      payload: {
        errors: schemaErrors,
        values: { ...state.values },
        touched: { ...state.touched },
        isValid: checkValidation(schemaErrors),
        isSubmitted: true,
      },
    });
    // Form submit handling.
    if (checkValidation(schemaErrors)) {
      // Run query to get the location's email address.
      let internalSlugArray = [];
      internalSlugArray.push(values.library);
      const { data: locationEmailData } = await client.query({
        query: LOCATION_BY_INTERNAL_SLUG,
        variables: {
          contentType: "library",
          limit: 1,
          pageNumber: 1,
          filter: {
            internalSlug: {
              fieldName: "field_ts_slug",
              operator: "IN",
              value: internalSlugArray,
            },
          },
        },
      });
      const emailAddress = locationEmailData?.allLocations?.items[0]?.email;
      // Add a fallback email in case there is no email data set in CMS?
      const emailTo = emailAddress ? emailAddress : "gethelp+fallback@nypl.org";
      // Get the location internal slug value from query, for use in redirect.
      const locationInternalSlug =
        locationEmailData?.allLocations?.items[0]?.internalSlug;
      // Email CC based on in person service choice, stored in the form state.
      let emailCc = "";
      // @TODO need to update these to use the actual email addresses.
      if (values.inPersonServices.length > 0) {
        switch (values.inPersonServices) {
          case "in-person-class-visit":
            emailCc = "schoolvisits@nypl.org";
            break;
          case "in-person-group-tour":
          case "in-person-offsite":
          case "in-person-community-partners":
            emailCc = "outreach@nypl.org";
            break;
        }
      }
      // Run the mutation, to try sending the email.
      const { data: sendEmailData } = await client.mutate({
        mutation: SEND_EMAIL_MUTATION,
        variables: {
          emailTo: emailTo,
          emailCc: emailCc,
          emailBody: formatRequestVisitEmail(values),
        },
      });
      const sendEmail = sendEmailData?.sendEmail;
      // Check if mutation was successful and email was sent.
      // If email is disabled for debubgging, then just submit the form
      // as successful, since it already passed form validation.
      if (sendEmail.statusCode === 202 || !sendEmail.emailEnable) {
        // Redirect to confirmation pg.
        router.push({
          pathname: "/locations/request-visit/confirmation",
          query: {
            id: locationInternalSlug,
          },
        });
      } else {
        // Server error, so update the form state to show the server level errors in notification component.
        dispatch({
          type: FormContextActionType.SET_FORM_STATE,
          payload: {
            errors: schemaErrors,
            values: { ...state.values },
            touched: { ...state.touched },
            isValid: state.isValid,
            isSubmitted: true,
            serverError: true,
          },
        });
        window.scrollTo(0, 0);
      }
    } else {
      // There are form validation errors, so scroll to top of page, and let
      // context state handle it as normal.
      window.scrollTo(0, 0);
    }
  }

  return (
    <Box maxWidth={[null, null, "637px"]}>
      <form id="request-visit-form" onSubmit={handleSubmit} noValidate>
        <Box
          sx={{
            "& h2": {
              paddingBottom: "s",
              borderBottom: "1px solid",
              borderColor: "ui.gray.medium",
            },
          }}
        >
          <Heading id="your-visit" level="two" text="Your Visit" />
        </Box>
        <Box my="m">
          <LibraryFormField handleChange={handleChange} />
        </Box>
        <Box my="m">
          <VisitTypeFormField
            handleChange={handleChange}
            handleChangeCheckboxGroup={handleChangeCheckboxGroup}
          />
        </Box>
        <Box my="m">
          <OrgFormField handleChange={handleChange} />
        </Box>
        <Box my="m">
          <AgeGroupFormField
            handleChangeCheckboxGroup={handleChangeCheckboxGroup}
          />
        </Box>
        <ContactInfoFormField handleChange={handleChange} />
        <HoneypotFormField />
        <Button id="request-visit-form-button" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default RequestVisitForm;
