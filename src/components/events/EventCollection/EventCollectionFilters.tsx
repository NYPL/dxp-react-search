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
  DatePicker,
  DatePickerTypes,
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

  let dateObject: any = {};
  const onChange = (data: any) => {
    dateObject = data;
    console.log(dateObject);
  };

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
      <DatePicker
        id="date-range"
        dateFormat="yyyy-MM-dd"
        dateType={DatePickerTypes.Full}
        minDate="1/1/2021"
        maxDate="3/1/2023"
        labelText="Select the date range you want to visit NYPL"
        nameFrom="visit-dates-from"
        nameTo="visit-dates-to"
        helperTextFrom="From this date."
        helperTextTo="To this date."
        helperText="Select a valid date range."
        invalidText="There was an error with the date range :("
        showOptReqLabel={false}
        isDateRange
        onChange={onChange}
      />
    </>
  );
}

export default EventCollectionFilters;
