import React, { useEffect, useState } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import {
  Button,
  Checkbox,
  Heading,
  HeadingDisplaySizes,
  Radio,
  Select,
  TextInput,
} from "@nypl/design-system-react-components";
// Next
import { useRouter } from "next/router";
// CSS
import s from "./RequestVisitForm.module.css";

const virtualServicesItems = [
  {
    id: "services-introduction",
    label: "Introduction to the Library",
  },
  {
    id: "services-registration",
    label: "Library Card Registration",
  },
  {
    id: "services-resources",
    label:
      "Online Resource Instruction (Digital Collections, Research, Database, etc)",
  },
  {
    id: "services-other",
    label: "Other:",
  },
];

const LOCATIONS_QUERY = gql`
  query LocationsQuery(
    $contentType: String
    $limit: Int
    $pageNumber: Int
    $libraryType: [String]
  ) {
    allLocations(
      contentType: $contentType
      limit: $limit
      pageNumber: $pageNumber
      filter: { libraryType: $libraryType }
    ) {
      items {
        id
        name
        internalSlug
      }
      pageInfo {
        limit
        totalItems
      }
    }
  }
`;

/*interface SelectedItems {
  items: string[];
}

interface SelectedItemsMap {
  [name: string]: SelectedItems;
}
*/

interface FormState {
  library: string;
  visitType: string;
  organization: string;
  ageGroup: string;
  contactName: string;
  contactEmail: string;
  virtualVisitServices: string[] | null;
  virtualVisitServicesOther: string;
}

function RequestVisitForm() {
  const [selected, setSelected] = useState({
    visitType: "",
    noSchoolOrOrg: false,
  });

  const [state, setState] = useState<FormState>({
    library: "",
    visitType: "",
    organization: "",
    ageGroup: "",
    contactName: "",
    contactEmail: "",
    virtualVisitServices: [],
    virtualVisitServicesOther: "",
  });

  const [formErrors, setFormErrors] = useState<any>(false);

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
      console.log("exists!");
      console.log(items);
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

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("handleSubmit!");
    //console.log(state);

    handleValidation();

    const emailBody = `
      Library: ${state.library}\n
      Visit Type: ${state.visitType}
    `;

    console.log(emailBody);
  }

  function handleValidation() {
    let errors = {};

    if (!state.library) {
      // @ts-ignore
      errors.library = "Please select a library";
    }
    if (!state.contactName) {
      // @ts-ignore
      errors.contactName = "Please enter your full name.";
    }
    if (!state.visitType) {
      // @ts-ignore
      errors.visitType = "Please select your visit type.";
    }

    setFormErrors(errors);
  }

  const { loading, error, data } = useQuery(LOCATIONS_QUERY, {
    variables: {
      contentType: "library",
      libraryType: ["hub", "neighborhood"],
      limit: 125,
      pageNumber: 1,
      //sortBy: sortBy ? sortBy : null,
    },
  });

  if (error) {
    return <div>Error while loading locations.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
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
      <Select
        name="library"
        id="request-visit-library-select"
        labelText="Please select a Library"
        // @ts-ignore
        onChange={handleChange}
        selectedOption={state.library}
        required
        showLabel
        showOptReqLabel
        errorText={formErrors.library}
        errored={formErrors.library}
      >
        {data.allLocations.items.map((location: any) => (
          <option value={location.internalSlug}>{location.name}</option>
        ))}
      </Select>
      <Select
        name="visitType"
        id="request-visit-select-type"
        labelText="Please select your visit type"
        onChange={handleChange}
        selectedOption={state.visitType}
        required
        showLabel
        errorText={formErrors.visitType}
        errored={formErrors.visitType}
      >
        <option value="" disabled selected>
          -- Select visit type --
        </option>
        <option value="virtual">Virtual Visit</option>
        <option value="in-person">In-Person Visit</option>
      </Select>
      {state.visitType === "virtual" && (
        <fieldset>
          <legend>
            What services would you like to include in your virtual visit?
          </legend>
          {virtualServicesItems.map((virtualServiceItem) => (
            <div className={s.checkBox}>
              <Checkbox
                labelText={virtualServiceItem.label}
                name={virtualServiceItem.id}
                onChange={(e) =>
                  handleCheckboxGroupChange(
                    "virtualVisitServices",
                    e.target.name
                  )
                }
                // @ts-ignore
                checked={state.virtualVisitServices.includes(
                  virtualServiceItem.id
                )}
                showLabel
              />
              {virtualServiceItem.id === "services-other" && (
                <TextInput
                  attributes={{
                    name: "virtualVisitServicesOther",
                  }}
                  labelText="What other service would you like to receive?"
                  showLabel={false}
                  onChange={handleChange}
                  value={state.virtualVisitServicesOther}
                />
              )}
            </div>
          ))}
        </fieldset>
      )}
      {state.visitType === "in-person" && (
        <fieldset>
          <legend>What would you like to request?</legend>
          <div className={s.checkBox}>
            <Radio
              helperText="Aptent congue tellus tincidunt torquent"
              labelText="Class Visit"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              helperText="Adipiscing sit laoreet eros lorem enim aliquet"
              labelText="Group Tour"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              helperText="Inceptos hac hendrerit cubilia sapien interdum est"
              labelText="Offsite Outreach"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              helperText="Inceptos hac hendrerit cubilia sapien interdum est"
              labelText="Opportunities for Community Partners"
              name="in-person-request"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Radio
              className={s.other}
              labelText="Other:"
              name="in-person-request"
              showLabel
            />
            <TextInput labelText="Other request." showLabel={false} />
          </div>
        </fieldset>
      )}
      <div className={s.schoolInfo}>
        <TextInput
          disabled={selected.noSchoolOrOrg}
          labelText="What school or organization are you with?"
          required={!selected.noSchoolOrOrg}
          showLabel={true}
          showOptReqLabel={!selected.noSchoolOrOrg}
        />
        <Checkbox
          checked={selected.noSchoolOrOrg}
          labelText="I’m not with a school or organization."
          name="noSchoolOrOrg"
          onChange={(e) => handleChange(e)}
          showLabel
        />
      </div>
      <fieldset>
        <legend>What age or grade is your group?</legend>
        <div className={s.checkBox}>
          <Checkbox
            labelText="Children (Pre-K to 5th Grade)"
            name="age-children"
            showLabel
          />
        </div>
        <div className={s.checkBox}>
          <Checkbox
            labelText="Teenagers (6th Grade to 12th Grade)"
            name="age-teenagers"
            showLabel
          />
        </div>
        <div className={s.checkBox}>
          <Checkbox labelText="Adults (18+)" name="age-adults" showLabel />
        </div>
      </fieldset>
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
