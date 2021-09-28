import React, { useEffect, useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
// Components
import { Select } from "@nypl/design-system-react-components";
// Next
import { useRouter } from "next/router";

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
  const router = useRouter();
  // Set the selected library to query param on initial render.
  useEffect(() => {
    if (router.query.id) {
      setSelectedLibrary(router.query.id as string);
    }
  }, []);

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
    <form onSubmit={handleSubmit}>
      <Select
        name="select-library"
        errorText="Something went wrong."
        id="request-visit-library-select"
        labelText="Please select a Library"
        //onBlur={function noRefCheck() {}}
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
        name="select-visit-type"
        errorText="Something went wrong."
        id="request-visit-select-type"
        labelText="Please select your visit type"
        //onBlur={function noRefCheck() {}}
        //onChange={function noRefCheck() {}}
        required
        selectedOption="Green"
        showLabel
        showOptReqLabel
      >
        <option value="a" aria-selected={false}>
          A
        </option>
      </Select>
    </form>
  );
}

export default RequestVisitForm;
