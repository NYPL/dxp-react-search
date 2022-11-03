import React, { useContext } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import { Select } from "@nypl/design-system-react-components";
import { FormFieldProps } from "../types";
import { FormContext } from "./../../../../context/FormContext";

export const LOCATIONS_QUERY = gql`
  query LocationsQuery(
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
      }
      pageInfo {
        limit
        totalItems
      }
      responseInfo {
        httpStatus
        httpStatusCode
        apiPath
      }
    }
  }
`;

function LibraryFormField({ handleChange }: FormFieldProps) {
  // @ts-ignore
  const [state] = useContext(FormContext);
  const { values, errors } = state;

  const { loading, error, data } = useQuery(LOCATIONS_QUERY, {
    variables: {
      contentType: "library",
      limit: 125,
      pageNumber: 1,
      filter: {
        libraryType: {
          fieldName: "field_ts_library_type",
          operator: "IN",
          value: ["hub", "neighborhood"],
        },
      },
      sort: {
        field: "title",
        direction: "ASC",
      },
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
      labelText="Please select a location"
      onChange={handleChange}
      value={values.library}
      isRequired
      showLabel
      invalidText={errors.library}
      isInvalid={errors.library ? true : false}
    >
      {data.allLocations.items.map((location: any) => (
        <option value={location.internalSlug}>{location.name}</option>
      ))}
    </Select>
  );
}

export default LibraryFormField;
