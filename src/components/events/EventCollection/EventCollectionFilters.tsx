import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { EVENT_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/eventFields";
// Components
import {
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLayoutTypes,
  Grid,
  Heading,
  HeadingLevels,
  Image,
  ImageRatios,
  Pagination,
} from "@nypl/design-system-react-components";

const EVENT_FILTER_QUERY = gql`
  query EventFilterQuery($resourceType: String) {
    eventFilterCollection(resourceType: $resourceType) {
      id
      name
    }
  }
`;

function EventCollectionFilters() {
  const { loading, error, data } = useQuery(EVENT_FILTER_QUERY, {
    variables: {
      resourceType: "ages",
    },
  });

  if (error) {
    return <div>Error while loading event filters.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <>
      <CheckboxGroup
        labelText="Audience"
        name="audience"
        layout={CheckboxGroupLayoutTypes.Row}
        optReqFlag={false}
      >
        {data.eventFilterCollection.map((item: any) => (
          <Checkbox
            key={item.id}
            id={item.id}
            value={item.id}
            labelText={item.name}
          />
        ))}
      </CheckboxGroup>
    </>
  );
}

export default EventCollectionFilters;
