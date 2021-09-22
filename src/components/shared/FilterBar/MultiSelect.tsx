import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
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

interface MutliSelectProps {
  id: string;
  label: string;
  type: string;
  limiter?: string;
  onSelectedItemChange: any;
  selectedItems: any;
  onClearMultiSelect: any;
  onSaveMultiSelect: any;
  onMenuClick: any;
  selectedGroupIds: string[];
  showCtaButtons: boolean;
  handleChangeMixedStateCheckbox: any;
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
}: MutliSelectProps) {
  // Apollo
  // Query for multi select data.
  const { loading, error, data } = useQuery(FILTERS_QUERY, {
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

  return (
    <DsMultiSelect
      id={id}
      label={label}
      items={data.allFiltersByGroupId}
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
