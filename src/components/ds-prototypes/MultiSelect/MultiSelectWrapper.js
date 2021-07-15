import React, { Fragment, useState } from 'react';
import MultiSelect from './MultiSelect';
import { Button } from '@nypl/design-system-react-components';

const groups = [
  {
    id: 'group_1',
    label: 'Subjects',
    items: [
      {
        id: 'florida',
        name: 'Florida'
      },
      {
        id: 'ny',
        name: 'New York'
      },
      {
        id: 'nj',
        name: 'New Jersey',
        children: [
          {
            id: 'jersey_city',
            name: 'Jersey City'
          },
          {
            id: 'trenton',
            name: 'Trenton'
          }
        ]
      }
    ]
  },
  {
    id: 'group_2',
    label: 'Audience',
    items: [
      {
        id: 'radiohead',
        name: 'Radiohead'
      },
      {
        id: 'pj_harvey',
        name: 'PJ Harvey'
      },
    ]
  },
  {
    id: 'group_3',
    label: 'Availability',
    items: [
      {
        id: 'no',
        name: 'Not available'
      },
      {
        id: 'yes',
        name: 'Available'
      },
    ]
  }
];

function MultiSelectWrapper() {
  const [selectedItems, setSelectedItems] = useState({});

  function onSelectedItemChange(selectedItem, groupId) {
    console.log('selectedItem')
    console.log(selectedItem)
    const itemId = selectedItem.id;

    const nextState = (object, property) => {
      let {[property]: omit, ...rest} = object
      return rest;
    }

    let itemIds;
    // Check if the tid already exists in the state
    if (selectedItems[groupId] !== undefined) {
      let itemIdExists = selectedItems[groupId].items.indexOf(itemId) > -1;
      // Make a copy of the existing array.
      itemIds = selectedItems[groupId].items.slice();
      // If termId exists, remove it from the array.
      if (itemIdExists) {
        itemIds = itemIds.filter((id) => id != itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }
    
    //console.log('ITEM IDS!')
    //console.log(itemIds)

    setSelectedItems({
      ...selectedItems,
      [groupId]: {
        items: itemIds
      }
    });
  }

  function onSaveMultiSelects() {
    console.log('onSaveMultiSelects')
    console.log(selectedItems)
  }

  function onClearMultiSelects(e) {
    console.log('onClearMultiSelects')
    setSelectedItems({})
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      padding: '3em 0'
    }}>
      {groups.map(group => {
        return (
          <MultiSelect
            id={group.id}
            label={group.label}
            items={group.items}
            handleOnSelectedItemChange={onSelectedItemChange}
            selectedItems={selectedItems}
          />
        )
      })}
      <Button
        buttonType="link"
        id={'multi-select-button-clear'}
        mouseDown={false}
        type="button"
        onClick={(e) => onClearMultiSelects(e)}
      >
        Clear
      </Button>
      <Button
        buttonType="filled"
        id={`multi-select-button-save`}
        mouseDown={false}
        type="button"
        onClick={(e) => onSaveMultiSelects(e)}
      >
        Apply Filters
      </Button>
    </div>
  )
}

export default MultiSelectWrapper;


/*
<MultiSelect
  id={group.id}
  label={"Group 1"}
  items={group.items}
  handleOnSelectedItemChange={onSelectedItemChange}
  selectedItems={selectedItems}
/>
*/