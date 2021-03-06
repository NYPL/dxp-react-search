import React, { useState } from 'react';
import Layout from './../../components/shared/layouts/Main';
import MultiSelect from './../../components/shared/MultiSelect';

const items = [
  {
    "vocabId": "subjects",
    "id": "b32835f7-19c5-4bcc-b143-73f2bf0d0f3e",
    "name": "Accessibility",
    "parent_uuid": "e99fad48-255b-4b5c-b557-dabfadb68aa2"
  },
  {
    "vocabId": "subjects",
    "id": "c8d5df2a-6f33-452c-bc8c-3af3c3f1302c",
    "name": "Advertising",
    "parent_uuid": "018979c6-d57f-42b6-b6a3-f8f4d919f5e8"
  },
  {
    "vocabId": "subjects",
    "id": "39ec164b-9b51-403a-a5bb-0506d63d7750",
    "name": "African American History",
    "parent_uuid": "3b37bfde-ca35-4b83-a509-ee1a2d6594bf"
  },
  {
    "vocabId": "subjects",
    "id": "bd9a1fb0-f7fd-4f67-80c0-d6df1e4ba4d2",
    "name": "African American Studies",
    "parent_uuid": "e99fad48-255b-4b5c-b557-dabfadb68aa2"
  }
];


function EventsSearch() {
  const vocabId = 'subjects';

  // Local state
  const [selectedItems, setSelectedItems] = useState({});

  function handleOnStateChange(changes) {
    const { type } = changes;    
    switch (type) {
      case '__item_click__':
      case '__menu_keydown_space_button__':
      case '__menu_keydown_enter__':
        onItemChange(changes.selectedItem);
        break;
      
      case '__togglebutton_click__':
        break;
    }
  }

  function onItemChange(item) {
    console.log(item);
    
    const itemId = item.id;
    let itemIds;
    // Check if the tid already exists in the state
    if (selectedItems[vocabId] !== undefined) {
      let itemIdExists = selectedItems[vocabId].terms.indexOf(itemId) > -1;
      // Make a copy of the existing array.
      itemIds = selectedItems[vocabId].terms.slice();
      // If itemId exists, remove it from the array.
      if (itemIdExists) {
        console.log('remove!')
        itemIds = itemIds.filter((id) => id != itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }
    // Update local state.
    setSelectedItems({
      ...selectedItems,
      [vocabId]: {
        terms: itemIds
      }
    });
  }

  function handleOnChecked(id, selectedItemId) {
    /*console.log('handleOnChecked selectedItems!');
    console.log(selectedItems);

    console.log('selectedItem only')
    console.log(selectedItem);
    */

    //console.log('selectedItem only')
    //console.log(selectedItemId);

    let filterChecked = false;
    if (selectedItems[id] !== undefined) {
      filterChecked = selectedItems[id].terms.find((filter) => filter === selectedItemId) 
    }
    return filterChecked;
  }

  console.log('selectedItems!');
  console.log(selectedItems);

  return (
    <Layout>
      <h1>Events Search</h1>
      <MultiSelect 
        id={vocabId}
        label={'Subjects'} 
        items={items}
        controlledSelectedItems={selectedItems}
        handleOnStateChange={handleOnStateChange}
        handleOnChecked={handleOnChecked}
      />
    </Layout>
  );
}

export default EventsSearch;
