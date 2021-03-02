import React, { useState } from 'react';
import { useSelect } from 'downshift';
import { Button, Icon, /*Checkbox,*/ List } from '@nypl/design-system-react-components';
import Checkbox from './../Checkbox';

// Reducers stuff
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
    customStateReducer
  } = props;

  // Downshift
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    closeMenu,
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
    // Item/checkbox checked 
    onSelectedItemChange: ({ selectedItem }) => {
      console.log('onSelectedItemChange!');

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
    ? `${label} (${selectedItems.length})`
    : `${label}`;
  
  function CheckboxList(props) {
    const { items } = props;

    return (
      <ul
        className={isOpen ? 'multiselect__items-expanded' : 'multiselect__items'}
        style={{'list-style-type': 'none'}}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item}${index}`}
              {
                ...getItemProps({
                  item,
                  index,
                })
              }
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
            >
              <Checkbox
                checked={selectedItems.includes(item)}
                value={item.id}
                onChange={() => null}
                checkboxId={item.id}
                labelOptions={{
                  labelContent: <>{item.name}</>
                }}
                name={item.name}
              />
              {item.children &&
                <ul
                  style={{'list-style-type': 'none'}}
                >
                  {item.children.map((childItem) => {
                    return (
                      <li
                        key={`${childItem}${index}`}
                        {...getItemProps({
                          childItem,
                          index,
                        })}
                      >
                        <Checkbox
                          checked={selectedItems.includes(childItem)}
                          value={childItem.id}
                          onChange={() => null}
                          checkboxId={childItem.id}
                          labelOptions={{
                            labelContent: <>{childItem.name}</>
                          }}
                          name={childItem.name}
                        />
                      </li>
                    )
                  })}
                </ul>
              }
            </li>
          ))
        }
      </ul>
    );
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
              {
                ...getItemProps({
                  item,
                  index,
                })
              }
              style={
                highlightedIndex === index
                  ? { backgroundColor: '#bde4ff' }
                  : {}
              }
            >
              <Checkbox
                checked={selectedItems.includes(item)}
                value={item.id}
                onChange={() => null}
                checkboxId={item.id}
                labelOptions={{
                  labelContent: <>{item.name}</>
                }}
                name={item.name}
              />
              {item.children &&
                <ul
                  style={{'list-style-type': 'none'}}
                >
                  {item.children.map((childItem) => {
                    return (
                      <li
                        key={`${childItem}${index}`}
                        {...getItemProps({
                          childItem,
                          index,
                        })}
                      >
                        <Checkbox
                          checked={selectedItems.includes(childItem)}
                          value={childItem.id}
                          onChange={() => null}
                          checkboxId={childItem.id}
                          labelOptions={{
                            labelContent: <>{childItem.name}</>
                          }}
                          name={childItem.name}
                        />
                      </li>
                    )
                  })}
                </ul>
              }
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
              closeMenu()
              onClickSave(id, selectedItems)
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
