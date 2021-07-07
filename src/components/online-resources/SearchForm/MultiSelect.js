import React, { useEffect, useState } from 'react';
// Apollo
import { useApolloClient, useQuery } from '@apollo/client';
import { MultiSelectQuery as MULTI_SELECT_QUERY } from './MultiSelect.gql';
// Components
import { default as DsMultiSelect } from './../../ds-prototypes/MultiSelect/MultiSelect';


function MultiSelect(props) {
  const { 
    id,
    label,
    limiter,
    //items,
    onSelectedItemChange,
    selectedItems
  } = props;

  // Apollo
  // Query for multi select data.
  const { loading, error, data } = useQuery(
    MULTI_SELECT_QUERY, {
      variables: {
        id: id,
        limiter: limiter
      }
    }
  );

  if (error) {
    return (
      <div>Error while loading ...</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div>Loading ...</div>
    );
  }

  return (
    <DsMultiSelect
      id={id}
      label={label}
      items={data.allFiltersByGroupId}
      handleOnSelectedItemChange={onSelectedItemChange}
      selectedItems={selectedItems}
    />
  );
}

export default MultiSelect;