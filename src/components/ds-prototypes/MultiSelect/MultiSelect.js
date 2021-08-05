import React from 'react';
// Components
import { Button, Checkbox, Icon, Radio } from '@nypl/design-system-react-components';
import FocusTrap from 'focus-trap-react';
// Styles
import s from './MultiSelect.module.css';

function MultiSelect(props) {
  const { 
    id, 
    label, 
    items,
    handleOnSelectedItemChange,
    selectedItems,
    onSaveMultiSelect,
    onClearMultiSelect,
    onMenuClick,
    selectedGroupIds,
    showCtaButtons,
    handleChangeMixedStateCheckbox
  } = props;

  const isOpen = selectedGroupIds.includes(id);
  const iconType = isOpen ? 'minus' : 'plus';

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

  function onChangeMixedStateCheckbox(groupId, item) {
    // Build an array of child items.
    let childIds = [];
    item.children.map(childItem => {
      childIds.push(childItem.id)
    });
    
    // This is the prop passed into the component that returns the childIds.
    handleChangeMixedStateCheckbox(childIds);
  }
  
  /**
   * Determines the checked state of a mixed state checkbox (parent).
   *
   * @param {string} groupdId - groupId of the checkbox group.
   * @param {array} item - an array of objects containing checkbox items.
   * @return {boolean} checked - true or false.
   */
  function setMixedStateCheckboxCheckedProp(groupdId, item) {
    /*
      true -- all children checked
      false -- no children checked
      mixed -- some children checked
    */

    let childIds = [];
    item.children.map(childItem => {
      childIds.push(childItem.id)
    });

    let checked = false;
    if (selectedItems[groupdId] !== undefined) {
      //
      if (childIds.every(childItem => selectedItems[groupdId].items.includes(childItem))) {
        checked = true;
      }
    }
    return checked;
  }
  
  // @TODO Temp workaround to render availability as radio not checkbox.
  function RadioOrCheckboxComponent(id, item) {
    if (id === 'availability') {
      return (
        <Radio
          id={item.id}
          labelText={<>{item.name}</>}
          showLabel={true}
          name={item.name}
          checked={setFilterCheckedProp(id, item.id) || false}
          onChange={handleOnSelectedItemChange}
        />
      )
    } else {
      return (
        <Checkbox
          id={item.id}
          labelText={<>{item.name}</>}
          showLabel={true}
          name={item.name}
          checked={setFilterCheckedProp(id, item.id) || false}
          onChange={handleOnSelectedItemChange}
        />
      )
    }
  }
  
  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: false,
      }}
      active={isOpen}
    >
      <div className={s.multiSelect}>
        <button  
          className={`${s.menuButton} ${selectedItems[id] !== undefined 
            && selectedItems[id].items.length && s.active}`
          } 
          type="button"
          onClick={onMenuClick}
        >
          <span>
            {getButtonLabel(id)}
          </span>
          <Icon
            decorative={true}
            name={iconType}
            modifiers={["small", {iconType}]}
          />
        </button>
        <div
          className={`${s.menu} ${isOpen && s.active}`}
        >
          <ul className={s.menuInner}>
            {isOpen &&
              items.map((item) => (
                <li key={item.id} className={s.menuItem}>
                  {item.children ? (
                    <>
                      <Checkbox
                        id={item.id}
                        labelText={<>{item.name}</>}
                        showLabel={true}
                        name={item.name}
                        checked={setMixedStateCheckboxCheckedProp(id, item) || false}
                        onChange={() => onChangeMixedStateCheckbox(id, item)}
                      />
                      <ul>
                        {item.children.map((childItem) => {
                          return (
                            <li key={childItem.id} className={s.childMenuItem}>
                              <Checkbox
                                id={childItem.id}
                                labelText={<>{childItem.name}</>}
                                showLabel={true}
                                name={childItem.name}
                                checked={setFilterCheckedProp(id, childItem.id) || false}
                                onChange={handleOnSelectedItemChange}
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  ) : (
                    RadioOrCheckboxComponent(id, item)
                  )}
                </li>
              ))
            }
          </ul>
          {isOpen && showCtaButtons &&
            <div className={s.ctaButtonsContainer}>
              <Button
                buttonType="link"
                id={`multiselect-button-clear-${id}`}
                className={s.ctaButtonsDesktopClear}
                mouseDown={false}
                type="button"
                onClick={onClearMultiSelect}
              >
                Clear
              </Button>
              <Button
                buttonType="filled"
                id={`multiselect-button-save-${id}`}
                mouseDown={false}
                type="button"
                onClick={onSaveMultiSelect}
              >
                Apply Filters
              </Button>
            </div>
          }
        </div>
      </div>
    </FocusTrap>
  );
}

export default MultiSelect;