import React from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import { Select } from "@nypl/design-system-react-components";
import { FormField as FormFieldProps } from "../types";

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

function LibraryFormField({
  formValues,
  formErrors,
  handleChange,
}: FormFieldProps) {
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
    <Select
      name="library"
      id="request-visit-library-select"
      labelText="Please select a Library"
      onChange={handleChange}
      selectedOption={formValues.library}
      required
      showLabel
      errorText={formErrors.library}
      errored={formErrors.library ? true : false}
    >
      {data.allLocations.items.map((location: any) => (
        <option value={location.internalSlug}>{location.name}</option>
      ))}
    </Select>
  );
}

export default LibraryFormField;
