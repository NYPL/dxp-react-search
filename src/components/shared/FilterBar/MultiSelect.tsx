import React, { useState } from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
// @ts-ignore
// @TODO fix only adding this to commit code
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

interface MultiSelectProps {
  id: string;
  label: string;
  type: string;
  limiter?: string;
  legacy?: boolean;
  includeChildren?: boolean;
  //
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedItems: SelectedItems;
  onClear: () => void;
  onApply: () => void;
  onMenuToggle: () => void;
  selectedGroupIds: string[];
  // @TODO fix the typing on this.
  handleChangeMixedStateCheckbox: any;
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
  onMenuToggle,
  selectedGroupIds,
  handleChangeMixedStateCheckbox,
  legacy,
  includeChildren = true,
}: MultiSelectProps) {
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
    /*return (
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
    */
    return <div>Loading</div>;
  }

  let filterItemsData = data.allFiltersByGroupId;
  if (legacy) {
    filterItemsData = data.allFiltersByGroupIdLegacy;
  }

  const isOpen = selectedGroupIds.includes(id);

  return (
    <DsMultiSelect
      variant="dialog"
      id={id}
      label={label}
      onMenuToggle={onMenuToggle}
      isOpen={isOpen}
      onApply={onApply}
      onClear={onClear}
      items={filterItemsData}
      onChange={onChange}
      selectedItems={selectedItems}
      onMixedStateChange={handleChangeMixedStateCheckbox}
    />
  );
}

export default MultiSelect;
