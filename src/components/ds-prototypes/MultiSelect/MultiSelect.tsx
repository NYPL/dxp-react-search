import React from "react";
// Components
import {
  Button,
  Checkbox,
  Icon,
  Radio,
} from "@nypl/design-system-react-components";
//import FocusTrap from "focus-trap-react";
const FocusTrap = require("focus-trap-react");
// Styles
import s from "./MultiSelect.module.css";

interface MultiSelectProps {
  id: string;
  label: string;
  items: any;
  handleOnSelectedItemChange: any;
  selectedItems: any;
  onSaveMultiSelect: OnSubmit | OnSave;
  onClearMultiSelect: () => void;
  onMenuClick: () => void;
  selectedGroupIds: string[];
  showCtaButtons: boolean;
  handleChangeMixedStateCheckbox: any;
}

interface MsItem {
  id: string;
  name: string;
  children: [
    {
      id: string;
      name: string;
    }
  ];
}

type OnSave = () => void;
type OnSubmit = (
  event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
) => void;

function MultiSelect({
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
}: MultiSelectProps) {
  const isOpen = selectedGroupIds.includes(id);
  const iconType = isOpen ? "minus" : "plus";

  function getButtonLabel(id: string) {
    let buttonLabel = label;
    if (selectedItems[id] !== undefined && selectedItems[id].items.length > 0) {
      buttonLabel = `${label} (${selectedItems[id].items.length})`;
    }
    return buttonLabel;
  }

  function setFilterCheckedProp(groupdId: string, itemId: string) {
    let checked = false;
    if (selectedItems[groupdId] !== undefined) {
      checked = selectedItems[groupdId].items.find(
        (filter: string) => filter === itemId
      );
    }
    return checked;
  }

  /*function onChangeMixedStateCheckbox(groupId: string, item: any) {
    // Build an array of child items.
    // @ts-ignore
    let childIds = [];
    // @ts-ignore
    item.children.map((childItem) => {
      childIds.push(childItem.id);
    });

    // This is the prop passed into the component that returns the childIds.
    // @ts-ignore
    handleChangeMixedStateCheckbox(childIds);
  }
  */

  /**
   * Determines the checked state of a mixed state checkbox (parent).
   *
   * @param {string} groupdId - groupId of the checkbox group.
   * @param {array} item - an array of objects containing checkbox items.
   * @return {boolean} checked - true or false.
   */
  /*function setMixedStateCheckboxCheckedProp(
    groupdId: string,
    item: { id: string; name: string; children: string[] }
  ) {
    let childIds = [];
    item.children.map((childItem) => {
      childIds.push(childItem.id);
    });

    let checked = false;
    if (selectedItems[groupdId] !== undefined) {
      //
      if (
        childIds.every((childItem) =>
          selectedItems[groupdId].items.includes(childItem)
        )
      ) {
        checked = true;
      }
    }
    return checked;
  }
  */

  // @TODO Temp workaround to render availability as radio not checkbox.
  function RadioOrCheckboxComponent(id: string, item: MsItem) {
    if (id === "availability") {
      return (
        <Radio
          id={`${item.name.replace(/\s+/g, "-").toLowerCase()}__${item.id}`}
          labelText={<>{item.name}</>}
          showLabel={true}
          name={item.name}
          isChecked={setFilterCheckedProp(id, item.id) || false}
          onChange={handleOnSelectedItemChange}
        />
      );
    } else {
      return (
        <Checkbox
          id={`${item.name.replace(/\s+/g, "-").toLowerCase()}__${item.id}`}
          labelText={<>{item.name}</>}
          showLabel={true}
          name={item.name}
          isChecked={setFilterCheckedProp(id, item.id) || false}
          onChange={handleOnSelectedItemChange}
        />
      );
    }
  }

  function hasSelectedItems() {
    if (
      (selectedItems[id] !== undefined && selectedItems[id].items.length) ||
      isOpen
    ) {
      return true;
    }
    return false;
  }

  //console.log(items);

  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: false,
      }}
      active={isOpen}
    >
      <div id={`multiselect-${id}`} className={s.multiSelect}>
        <button
          id={`multiselect-menu-button-${id}`}
          className={`${s.menuButton} ${hasSelectedItems() && s.active}`}
          type="button"
          onClick={onMenuClick}
        >
          <span>{getButtonLabel(id)}</span>
          <Icon decorative={true} name={iconType} size="small" />
        </button>
        <div className={`${s.menu} ${isOpen && s.active}`}>
          <ul className={s.menuInner} role="dialog">
            {isOpen &&
              items.map((item: MsItem) => (
                <li
                  key={`${item.name.replace(/\s+/g, "-").toLowerCase()}__${
                    item.id
                  }`}
                  className={s.menuItem}
                >
                  {item.children ? (
                    <>
                      <Checkbox
                        id={`${item.name.replace(/\s+/g, "-").toLowerCase()}__${
                          item.id
                        }`}
                        labelText={<>{item.name}</>}
                        showLabel={true}
                        name={item.name}
                        /*isChecked={setMixedStateCheckboxCheckedProp(id, item) || false}
                        onChange={() => onChangeMixedStateCheckbox(id, item)}
                        */
                        isChecked={setFilterCheckedProp(id, item.id) || false}
                        onChange={handleOnSelectedItemChange}
                      />
                      <ul>
                        {item.children.map((childItem) => {
                          return (
                            <li
                              key={`${childItem.name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}__${childItem.id}`}
                              className={s.childMenuItem}
                            >
                              <Checkbox
                                id={`${childItem.name
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}__${childItem.id}`}
                                labelText={<>{childItem.name}</>}
                                showLabel={true}
                                name={childItem.name}
                                isChecked={
                                  setFilterCheckedProp(id, childItem.id) ||
                                  false
                                }
                                onChange={handleOnSelectedItemChange}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    RadioOrCheckboxComponent(id, item)
                  )}
                </li>
              ))}
          </ul>
          {isOpen && showCtaButtons && (
            <div className={s.ctaButtonsContainer}>
              <Button
                buttonType="text"
                id={`multiselect-button-clear-${id}`}
                className={s.ctaButtonsDesktopClear}
                mouseDown={false}
                type="button"
                onClick={onClearMultiSelect}
              >
                Clear
              </Button>
              <Button
                buttonType="primary"
                id={`multiselect-button-save-${id}`}
                mouseDown={false}
                type="button"
                onClick={onSaveMultiSelect}
              >
                Apply Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </FocusTrap>
  );
}

export default MultiSelect;
