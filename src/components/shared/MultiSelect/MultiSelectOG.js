import React, { useState } from 'react';
import { useSelect } from 'downshift';
import { Checkbox, List } from '@nypl/design-system-react-components';

const items = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
];

function stateReducer(state, actionAndChanges) {
  const { changes, type } = actionAndChanges
  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
      }
    default:
      return changes
  }
}

function MultiSelect(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    stateReducer,
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return
      }
      const index = selectedItems.indexOf(selectedItem)
      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ])
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)])
      } else {
        setSelectedItems([...selectedItems, selectedItem])
      }
    },
  });

  const buttonText = selectedItems.length
    ? `${props.label} (${selectedItems.length})`
    : `${props.label}`;
  
  return (
    <div className={'multiselect'}>
      <button type="button" {...getToggleButtonProps()}>
        {buttonText}
      </button>
      <ul 
        style={{'list-style-type': 'none'}}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              <Checkbox
                checked={selectedItems.includes(item)}
                value={item}
                onChange={() => null}
                checkboxId={item}
                labelOptions={{
                  labelContent: <>{item}</>
                }}
                name={item}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MultiSelect;


<div 
className="multiselect__items-buttons"
id={label}
>
  <Button
    buttonType="link"
    id={`button-clear-${label}`}
    mouseDown={false}
    type="button"
    onClick={onClickClear}
  >
    Clear
  </Button>
  <Button
    buttonType="filled"
    id={`button-save-${label}`}
    mouseDown={false}
    type="button"
    onClick={onClickSave}
  >
    Apply Filters
  </Button>
</div>