import React, { Fragment, useState } from 'react';
import MultiSelect from './MultiSelect';

const groups = [
  {
    id: 'group_1',
    label: 'Group 1',
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
    label: 'Bands',
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

  return (
    <div>
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