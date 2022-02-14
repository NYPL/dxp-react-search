import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Types
import { SelectedItemsMap } from "./types";
// Components
import { default as DsMultiSelect } from "../../ds-prototypes/MultiSelect/MultiSelect";

const FILTERS_QUERY = gql`
  query FiltersQuery(
    $id: String
    $type: String
    $limit: Int
    $pageNumber: Int
    $filter: FilterQueryFilter
    $sort: Sort
    $includeChildren: Boolean!
  ) {
    allFiltersByGroupId(
      id: $id
      type: $type
      limit: $limit
      pageNumber: $pageNumber
      filter: $filter
      sort: $sort
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

const FILTERS_QUERY_LEGACY = gql`
  query MultiSelectQuery($id: String, $limiter: String) {
    allFiltersByGroupIdLegacy(id: $id, limiter: $limiter) {
      id
      name
      children {
        id
        name
      }
    }
  }
`;

interface MutliSelectProps {
  id: string;
  label: string;
  type: string;
  limiter?: string;
  onSelectedItemChange(event: React.MouseEvent<HTMLButtonElement>): void;
  selectedItems: SelectedItemsMap;
  onClearMultiSelect: () => void;
  onSaveMultiSelect: () => void;
  onMenuClick: () => void;
  selectedGroupIds: string[];
  showCtaButtons: boolean;
  handleChangeMixedStateCheckbox: any;
  legacy?: boolean;
  includeChildren?: boolean;
}

function MultiSelect({
  id,
  label,
  type,
  limiter,
  onSelectedItemChange,
  selectedItems,
  onClearMultiSelect,
  onSaveMultiSelect,
  onMenuClick,
  selectedGroupIds,
  showCtaButtons,
  handleChangeMixedStateCheckbox,
  legacy,
  includeChildren = true,
}: MutliSelectProps) {
  let FiltersQueryAll = FILTERS_QUERY;
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
  };
  if (legacy) {
    FiltersQueryAll = FILTERS_QUERY_LEGACY;
    variables = {
      id: id,
      type: type,
      // @ts-ignore
      limiter: limiter,
      includeChildren: includeChildren,
    };
  }

  const { loading, error, data } = useQuery(FiltersQueryAll, {
    variables: variables,
  });

  if (error) {
    return <div>Error while loading ...</div>;
  }

  // Loading state,
  if (loading || !data) {
    return (
      <DsMultiSelect
        id={id}
        label={label}
        items={null}
        handleOnSelectedItemChange={onSelectedItemChange}
        selectedItems={selectedItems}
        onClearMultiSelect={onClearMultiSelect}
        onSaveMultiSelect={onSaveMultiSelect}
        onMenuClick={onMenuClick}
        selectedGroupIds={selectedGroupIds}
        showCtaButtons={showCtaButtons}
        handleChangeMixedStateCheckbox={handleChangeMixedStateCheckbox}
      />
    );
  }

  let filterItemsData = data.allFiltersByGroupId;
  if (legacy) {
    filterItemsData = data.allFiltersByGroupIdLegacy;
  }

  return (
    <DsMultiSelect
      id={id}
      label={label}
      items={filterItemsData}
      handleOnSelectedItemChange={onSelectedItemChange}
      selectedItems={selectedItems}
      onClearMultiSelect={onClearMultiSelect}
      onSaveMultiSelect={onSaveMultiSelect}
      onMenuClick={onMenuClick}
      selectedGroupIds={selectedGroupIds}
      showCtaButtons={showCtaButtons}
      handleChangeMixedStateCheckbox={handleChangeMixedStateCheckbox}
    />
  );
}

export default MultiSelect;
