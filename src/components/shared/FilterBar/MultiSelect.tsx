import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import {
  MultiSelect as DsMultiSelect,
  SelectedItems,
} from "@nypl/design-system-react-components";

const FILTERS_QUERY = gql`
  query FiltersQuery(
    $id: String
    $type: String
    $limit: Int
    $pageNumber: Int
    $filter: FilterQueryFilter
    $sort: Sort
    $includeChildren: Boolean!
    $customData: Boolean
  ) {
    allFiltersByGroupId(
      id: $id
      type: $type
      limit: $limit
      pageNumber: $pageNumber
      filter: $filter
      sort: $sort
      customData: $customData
    ) {
      id
      name
      children @include(if: $includeChildren) {
        id
        name
      }
    }
  }
`;

interface MultiSelectProps {
  id: string;
  label: string;
  type: string;
  limiter?: string;
  /** Include 2nd level child items. */
  includeChildren?: boolean;
  /** Escape hatch for use cases where the filter data does not come from api request, but hard coded. */
  customData?: boolean;
  selectedItems: SelectedItems;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMixedStateChange?: any;
  onApply: () => void;
  onClear?: () => void;
}

function MultiSelect({
  id,
  label,
  type,
  limiter,
  onChange,
  onMixedStateChange,
  selectedItems,
  onClear,
  onApply,
  includeChildren = true,
  customData = false,
}: MultiSelectProps) {
  let variables = {
    id: id,
    type: type,
    limit: 200,
    pageNumber: 1,
    filter: {
      limiter: {
        fieldName: "field_lts_content_type",
        operator: "=",
        value: limiter,
      },
    },
    sort: {
      field: type === "content" ? "title" : "name",
      direction: "ASC",
    },
    includeChildren: includeChildren,
    customData: customData,
  };

  const { loading, error, data } = useQuery(FILTERS_QUERY, {
    variables: variables,
  });

  if (error) {
    return <div>Error while loading ...</div>;
  }

  // Loading state.
  if (loading || !data) {
    return (
      <DsMultiSelect
        id={id}
        variant="dialog"
        label={label}
        items={[]}
        onChange={onChange}
        //onMixedStateChange={onMixedStateChange}
        selectedItems={selectedItems}
        onClear={onClear}
        onApply={onApply}
      />
    );
  }

  const items = data.allFiltersByGroupId;

  const handleMixedStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const multiSelectId = id;
    const parentId = e.currentTarget.id;
    onMixedStateChange(multiSelectId, parentId, items);
  };

  return (
    <DsMultiSelect
      id={id}
      variant="dialog"
      label={label}
      items={items}
      width="fitContent"
      onChange={onChange}
      // onMixedStateChange={(e) => {
      //   const multiSelectId = id;
      //   const parentId = e.currentTarget.id;
      //   onMixedStateChange(multiSelectId, parentId, items);
      // }}
      //onMixedStateChange={(e) => handleMixedStateChange(e)}
      onMixedStateChange={handleMixedStateChange}
      selectedItems={selectedItems}
      onClear={onClear}
      onApply={onApply}
    />
  );
}

export default MultiSelect;
