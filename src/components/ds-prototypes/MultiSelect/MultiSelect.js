import React, { useState } from 'react';
import { useMultipleSelection, useSelect } from 'downshift';
import { Button, Icon, /*Checkbox,*/ List } from '@nypl/design-system-react-components';
import Checkbox from './../../shared/Checkbox';

import s from './MultiSelect.module.css';

function stateReducer(state, actionAndChanges) {
  const { changes, type } = actionAndChanges;

  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      //console.log(changes)
      return {
        ...changes,
        isOpen: true, // Keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
        //selectedItem: 'jersey_city'
      }
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
    handleOnSelectedItemChange,
    selectedItems
  } = props;

  const {
    closeMenu,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    //highlightedIndex,
    getItemProps,
    selectItem
  } = useSelect({
    items,
    stateReducer,
    selectedItem: selectedItems,
    onSelectedItemChange: ({ selectedItem }) => handleOnSelectedItemChange(selectedItem, id),
  });

  function getButtonLabel(id) {
    let buttonLabel = label;
    if (
      selectedItems[id] !== undefined
      && selectedItems[id].items.length > 0
    ) {
      buttonLabel = `${label} (${selectedItems[id].items.length})`;
    }
    return buttonLabel;
  }

  function setFilterCheckedProp(groupdId, itemId) {
    let checked = false;
    if (selectedItems[groupdId] !== undefined) {
      checked = selectedItems[groupdId].items.find((filter) => filter === itemId) 
    }
    return checked;
  }

  //console.log(highlightedIndex)
  const iconType = isOpen ? 'minus' : 'plus';
  
  return (
    <div className={s.multiselect}>
      <button className={s.button} type="button" {...getToggleButtonProps()}>
        <span className={s.button__label}>
          {getButtonLabel(id)}
        </span>
        
        <Icon
          decorative={true}
          name={iconType}
          modifiers={["small", {iconType}]}
        />
      </button>
      <ul
        className={`${s.menu} ${isOpen && s.active}`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li 
              {...getItemProps({
                key: item.id,
                item,
                index,
              })}
              /*style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
              */
            >
              <Checkbox
                id={item.id}
                name={item.name}
                checked={setFilterCheckedProp(id, item.id) || false}
                onChange={(e) => null}
              />
          
              {item.children &&
                <ul>
                  {item.children.map((childItem) => {
                    return (
                      <li
                        {...getItemProps({
                          key: childItem.id,
                          item: childItem,
                          index: childItem.id,
                          //index
                        })}
                        className="item-child"
                        /*style={
                          highlightedIndex === childItem.id
                            ? { backgroundColor: '#bde4ff' }
                            : {}
                        }
                        */
                        /*onClick={(e) => {
                          console.log('childItem')
                          console.log(childItem)
                          e.preventDefault();
                          selectItem(childItem)
                        }}
                        */
                      >
                        <input
                          id={childItem.id}
                          type="checkbox"
                          checked={setFilterCheckedProp(id, childItem.id) || false}
                          value={childItem.id}
                          // Sets the selectedItem to childItem, otherwise parent
                          // is always used.
                          onChange={() => {
                            selectItem(childItem);
                          }}
                        />
                        <label
                          htmlFor={childItem.id}
                          onClick={(e) => {
                            //console.log('childItem')
                            //console.log(childItem)
                            e.preventDefault();
                            //selectItem(childItem)
                          }}
                        >
                          {childItem.name}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default MultiSelect;