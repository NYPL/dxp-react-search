import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Types
import { SelectedItemsMap } from "./types";
// Components
import { default as DsMultiSelect } from "../../ds-prototypes/MultiSelect/MultiSelect";

const FILTERS_QUERY = gql`
  query FiltersQuery($id: String, $type: String, $limiter: String) {
    allFiltersByGroupId(id: $id, type: $type, limiter: $limiter) {
      id
      name
      children {
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
}: MutliSelectProps) {
  let FiltersQueryAll = FILTERS_QUERY;
  if (legacy) {
    FiltersQueryAll = FILTERS_QUERY_LEGACY;
  }

  const { loading, error, data } = useQuery(FiltersQueryAll, {
    variables: {
      id: id,
      type: type,
      limiter: limiter ? limiter : null,
    },
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
