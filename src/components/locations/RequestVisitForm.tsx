import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
//
import { Select } from "@nypl/design-system-react-components";

/*const SUBJECTS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  query ChannelsQuery(
    $vocabulary: String
    $sortBy: String
    $limit: Int
    $featured: Boolean
    $limiter: String
  ) {
    allTermsByVocab(
      vocabulary: $vocabulary
      sortBy: $sortBy
      limit: $limit
      featured: $featured
      limiter: $limiter
    ) {
      ...TermBaseFields
    }
  }
`;
*/

function RequestVisitForm() {
  return (
    <form>
      <Select
        name="select-library"
        attributes={{
          "aria-describedby": "mySelect-helperText",
          onBlur: function noRefCheck() {},
          onChange: function noRefCheck() {},
          onFocus: function noRefCheck() {},
        }}
        errorText="Something went wrong."
        //helperText="Choose wisely."
        id="request-visit-library-select"
        labelText="Please select a Library"
        onBlur={function noRefCheck() {}}
        onChange={function noRefCheck() {}}
        required
        selectedOption="Green"
        showLabel
        showOptReqLabel
      >
        <option value="a" aria-selected={false}>
          A
        </option>
      </Select>
      <Select
        name="select-visit-type"
        attributes={{
          "aria-describedby": "mySelect-helperText",
          onBlur: function noRefCheck() {},
          onChange: function noRefCheck() {},
          onFocus: function noRefCheck() {},
        }}
        errorText="Something went wrong."
        //helperText="Choose wisely."
        id="request-visit-select-type"
        labelText="Please select your visit type"
        onBlur={function noRefCheck() {}}
        onChange={function noRefCheck() {}}
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
