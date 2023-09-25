import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import {
  MultiSelect as DsMultiSelect,
  SelectedItems,
} from "@nypl/design-system-react-components";

export const LOCALIST_EVENT_FILTER_COLLECTION_QUERY = gql`
  query LocalistEventFilterCollectionQuery($id: String!, $type: String!) {
    localistFilterCollection(id: $id, type: $type) {
      id
      name
    }
  }
`;

export const FILTERS_QUERY = gql`
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
  onApply: () => void;
  onClear?: () => void;
}

function MultiSelect({
  id,
  label,
  type,
  limiter,
  onChange,
  selectedItems,
  onClear,
  onApply,
  includeChildren = true,
  customData = false,
}: MultiSelectProps) {
  let MULTISELECT_QUERY = FILTERS_QUERY;
  let variables: any = {
    id: id,
    type: type,
    limit: 200,
    pageNumber: 1,
    ...(limiter && {
      filter: {
        limiter: {
          fieldName: "field_lts_content_type",
          operator: "=",
          value: limiter,
        },
      },
    }),
    sort: {
      field: type === "content" ? "title" : "name",
      direction: "ASC",
    },
    includeChildren: includeChildren,
    customData: customData,
  };

  const isLocalistDataSource =
    type === "localist_filter" || type === "localist_place";

  if (isLocalistDataSource) {
    MULTISELECT_QUERY = LOCALIST_EVENT_FILTER_COLLECTION_QUERY;
    variables = {
      id: id,
      type: type,
    };
  }

  const { loading, error, data } = useQuery(MULTISELECT_QUERY, {
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
        type="dialog"
        labelText={label}
        items={[]}
        onChange={onChange}
        selectedItems={selectedItems}
        onClear={onClear}
        onApply={onApply}
      />
    );
  }

  let items = data.allFiltersByGroupId;
  if (isLocalistDataSource) {
    items = data.localistFilterCollection;
  }

  return (
    <DsMultiSelect
      id={id}
      type="dialog"
      labelText={label}
      items={items}
      onChange={onChange}
      selectedItems={selectedItems}
      onClear={onClear}
      onApply={onApply}
    />
  );
}

export default MultiSelect;
