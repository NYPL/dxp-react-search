import React from 'react';
// Components
import { Button, Checkbox, Icon } from '@nypl/design-system-react-components';
import FocusTrap from 'focus-trap-react';
// Styles
import s from './MultiSelect.module.css';

function MultiSelect(props) {
  const { 
    id, 
    label, 
    items,
    handleOnSelectedItemChange,
    //onSelectedItemChange,
    selectedItems,
    onSaveMultiSelect,
    onClearMultiSelect,
    onMenuClick,
    selectedGroupIds,
    showCtaButtons
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
          className={s.menuButton} 
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
                  <Checkbox
                    id={item.id}
                    labelText={<>{item.name}</>}
                    showLabel={true}
                    name={item.name}
                    checked={setFilterCheckedProp(id, item.id) || false}
                    onChange={handleOnSelectedItemChange}
                  />
                  {item.children &&
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
                  }
                </li>
              ))
            }
          </ul>
          {isOpen && showCtaButtons &&
            <div className={s.ctaButtonsContainer}>
              <Button
                buttonType="link"
                id={`multiselect-button-clear-${id}`}
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