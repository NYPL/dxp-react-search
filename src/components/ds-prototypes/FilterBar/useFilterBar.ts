import * as React from "react";
import {
  MultiSelectItem,
  SelectedItems,
} from "@nypl/design-system-react-components";

export default function useFilterBar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<SelectedItems>({});

  const handleChange = (itemId: string, multiSelectId: string) => {
    let itemIds;
    // Check if the id already exists in the state.
    if (selectedItems.hasOwnProperty(multiSelectId)) {
      // Make a copy of the existing items array.
      itemIds = selectedItems[multiSelectId].items.slice();
      // If id exists, remove it from the array.
      if (selectedItems[multiSelectId].items.indexOf(itemId) > -1) {
        itemIds = itemIds.filter((id) => id !== itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }

    setSelectedItems({
      ...selectedItems,
      [multiSelectId]: {
        items: itemIds,
      },
    });
  };

  const handleMixedStateChange = (
    multiSelectId: string,
    parentId: string,
    items: MultiSelectItem[]
  ) => {
    // Build an array of child items.
    let childItems: string[] = [];
    items.map((item) => {
      if (item.id === parentId) {
        item.children &&
          item.children.map((childItem: MultiSelectItem) => {
            childItems.push(childItem.id);
          });
      }
    });

    let newItems;
    // Some selected items for group already exist in state.
    if (selectedItems[multiSelectId] !== undefined) {
      //
      if (
        childItems.every((childItem) =>
          selectedItems[multiSelectId].items.includes(childItem)
        )
      ) {
        newItems = selectedItems[multiSelectId].items.filter(
          (stateItem) => !childItems.includes(stateItem)
        );
      } else {
        // Merge all child items.
        newItems = [...childItems, ...selectedItems[multiSelectId].items];
      }
    } else {
      newItems = childItems;
    }

    setSelectedItems({
      ...selectedItems,
      [multiSelectId]: {
        items: newItems,
      },
    });
  };

  // const handleMixedStateChange = (items: MultiSelectItem[]) => {
  //   console.log("useFilterBar");
  //   console.log(items);
  // };

  const handleClear = (multiSelectId: string) => {
    setSelectedItems({});
  };

  return {
    isOpen: isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    // Multiselect specific.
    onChange: handleChange,
    onMixedStateChange: handleMixedStateChange,
    onClear: handleClear,
    selectedItems: selectedItems,
    setSelectedItems: (state: SelectedItems) => setSelectedItems(state),
    //onToggle: handleToggle,
  };
}
