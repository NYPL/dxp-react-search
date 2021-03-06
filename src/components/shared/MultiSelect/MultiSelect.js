import React, { useState } from 'react';
import { useMultipleSelection, useSelect } from 'downshift';
import { Button, Icon, /*Checkbox,*/ List } from '@nypl/design-system-react-components';
import Checkbox from './../Checkbox';

function stateReducer(state, actionAndChanges) {
  const { changes, type } = actionAndChanges;

  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // Keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
      }
    
    case useSelect.stateChangeTypes.ToggleButtonClick:
      //console.log('ToggleButtonClick');
      //console.log(changes);

    default:
      return changes;
  }
}

function MultiSelect(props) {
  // Props
  const { 
    id, 
    label, 
    items,
    // Submit buttons controlled by parent/consuming component.
    onClickClear, 
    onClickSave,
    handleOnStateChange,
    handleOnChecked,
    selectedItems: controlledSelectedItems
  } = props;

  const {
    closeMenu,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    //selectedItem: selectedItems
  } = useSelect({
    items,
    stateReducer,
    onStateChange: handleOnStateChange
  });

  /*const buttonText = controlledSelectedItems.length
    ? `${label} (${controlledSelectedItems.length})`
    : `${label}`;
  */
  const buttonText = label;

  function testOnChange(e, id, itemId) {
    console.log('testOnChange!');
    console.log(itemId);
    
    console.log('vocab id?!');
    console.log(id);
  }
  
  return (
    <div className={'multiselect'}>
      <button type="button" {...getToggleButtonProps()}>
        <span className={'multiselect__label'}>
          {buttonText}
        </span>
        <Icon
          decorative={true}
          name="minus"
          modifiers={["small", "minus"]}
        />
        <Icon
          decorative={true}
          name="plus"
          modifiers={["small", "plus"]}
        />
      </button>
      <ul
        className={isOpen ? 'multiselect__items-expanded' : 'multiselect__items'}
        style={{'list-style-type': 'none'}}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps(
                {
                  item,
                  index,
                }
              )}
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
            >
              <Checkbox
                checked={handleOnChecked(item.vocabId, item.id) || false}
                value={item.id}
                onChange={(e) => testOnChange(e, id, item.id)}
                checkboxId={item.id}
                labelOptions={{
                  labelContent: <>{item.name}</>
                }}
                name={item.name}
              />
            </li>
          ))
        }
        <div 
          className="multiselect__items-buttons"
          id={label}
        >
          <Button
            buttonType="link"
            id={`button-clear-${label}`}
            mouseDown={false}
            type="button"
            onClick={() => {
              closeMenu()
              onClickClear(id, selectedItems)
            }}
          >
            Clear
          </Button>
          <Button
            buttonType="filled"
            id={`button-save-${label}`}
            mouseDown={false}
            type="button"
            onClick={() => {
              //onSave(id, selectedItems)
              closeMenu()
              
            }}
          >
            Apply Filters
          </Button>
        </div>
      </ul>
    </div>
  );
}

export default MultiSelect;
