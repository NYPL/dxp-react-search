import React, { useEffect, useState } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import {
  Heading,
  Select,
  Radio,
  Checkbox,
  TextInput,
  HeadingDisplaySizes,
} from "@nypl/design-system-react-components";
// Next
import { useRouter } from "next/router";
// CSS
import s from "./RequestVisitForm.module.css";

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

function RequestVisitForm() {
  const [selectedLibrary, setSelectedLibrary] = useState<string>();
  const [selected, setSelected] = useState({
    visitType: "",
    noSchoolOrOrg: false,
  });
  const router = useRouter();
  // Set the selected library to query param on initial render.
  useEffect(() => {
    if (router.query.id) {
      setSelectedLibrary(router.query.id as string);
    }
  }, []);

  function handleChange(event: any) {
    console.clear();
    console.log(event.currentTarget.checked);
    let value;
    if (event.currentTarget.checked) {
      value = event.currentTarget.checked;
    } else {
      value = event.currentTarget.value;
    }
    setSelected({
      ...selected,
      [event.currentTarget.name]: value,
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("handleSubmit!");
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
      <Heading
        id="your-visit"
        displaySize={HeadingDisplaySizes.Secondary}
        level={2}
        text="Your Visit"
      />
      <Select
        name="select-library"
        errorText="Something went wrong."
        id="request-visit-library-select"
        labelText="Please select a Library"
        // @ts-ignore
        onChange={(e) => setSelectedLibrary(e.currentTarget.value)}
        required
        selectedOption={selectedLibrary}
        showLabel
        showOptReqLabel
      >
        {data.allLocations.items.map((location: any) => (
          <option value={location.internalSlug}>{location.name}</option>
        ))}
      </Select>
      <Select
        name="visitType"
        errorText="Something went wrong."
        id="request-visit-select-type"
        labelText="Please select your visit type"
        onChange={(e) => handleChange(e)}
        required
        // @ts-ignore
        selectedOption={selected.visitType}
        showLabel
        showOptReqLabel
      >
        <option value="" disabled selected>
          -- Select visit type --
        </option>
        <option value="virtual">Virtual Visit</option>
        <option value="in-person">In-Person Visit</option>
      </Select>
      {selected.visitType === "virtual" && (
        <fieldset>
          <legend>
            What services would you like to include in your virtual visit?
          </legend>
          <div className={s.checkBox}>
            <Checkbox
              labelText="Introduction to the Library"
              name="services-introduction"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Checkbox
              labelText="Library Card Registration"
              name="services-registration"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Checkbox
              labelText="Online Resource Instruction (Digital Collections, Research, Database, etc)"
              name="services-resources"
              showLabel
            />
          </div>
          <div className={s.checkBox}>
            <Checkbox
              className={s.other}
              labelText="Other:"
              name="services-other"
              showLabel
            />
            <TextInput
              labelText="What other service would you like to receive?"
              showLabel={false}
            />
          </div>
        </fieldset>
      )}
      {selected.visitType === "in-person" && (
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
      <div>
        <Heading
          id="contact-info"
          displaySize={HeadingDisplaySizes.Secondary}
          level={2}
          text="Your Contact Information"
        />
        <TextInput
          labelText="Name"
          placeholder="Enter your name"
          showOptReqLabel={false}
        />
        <TextInput
          labelText="Email"
          placeholder="Enter your email"
          showOptReqLabel={false}
        />
      </div>
    </form>
  );
}

export default RequestVisitForm;
