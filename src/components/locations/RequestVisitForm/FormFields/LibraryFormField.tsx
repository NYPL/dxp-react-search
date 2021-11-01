import React, { useContext } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import { Select } from "@nypl/design-system-react-components";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

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

function LibraryFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors, touched, isSubmitted } = state;

  const { loading, error, data } = useQuery(LOCATIONS_QUERY, {
    variables: {
      contentType: "library",
      libraryType: ["hub", "neighborhood"],
      limit: 125,
      pageNumber: 1,
    },
  });

  if (error) {
    return <div>Error while loading locations.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <Select
      name="library"
      id="request-visit-library-select"
      labelText="Please select a library"
      onChange={handleChange}
      selectedOption={values.library}
      required
      showLabel
      errorText={errors.library}
      errored={errors.library ? true : false}
    >
      {data.allLocations.items.map((location: any) => (
        <option value={location.internalSlug}>{location.name}</option>
      ))}
    </Select>
  );
}

export default LibraryFormField;
