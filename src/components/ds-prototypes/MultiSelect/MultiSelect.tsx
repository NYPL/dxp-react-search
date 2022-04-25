import React, { useEffect, useRef, useState } from "react";
// Components
import {
  Box,
  Button,
  ButtonTypes,
  Checkbox,
  Icon,
  Radio,
} from "@nypl/design-system-react-components";
import FocusTrap from "focus-trap-react";
// Hooks
import useWindowSize from "../../../hooks/useWindowSize";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { MultiSelectItem, SelectedItems } from "./MultiSelect.types";
// Styles
import s from "./MultiSelect.module.css";

interface MultiSelectProps {
  id: string;
  label: string;
  items: MultiSelectItem[];
  handleOnSelectedItemChange: any;
  selectedItems: SelectedItems;
  onSaveMultiSelect: () => void;
  onClearMultiSelect: () => void;
}

function MultiSelect({
  id,
  label,
  items,
  handleOnSelectedItemChange,
  selectedItems,
  onSaveMultiSelect,
  onClearMultiSelect,
}: MultiSelectProps) {
  //const isOpen = selectedGroupIds.includes(id);
  // Track the window size width, to set isMobile.
  const [isMobile, setIsMobile] = useState<boolean>();
  const width = useWindowSize();
  useEffect(() => {
    if (width && width >= 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [width]);

  // Control the open or closed state of the multiselect.
  const [isOpen, setIsOpen] = useState(false);
  // Create a ref that we add to the element for which we want to detect outside clicks.
  const ref = useRef<HTMLDivElement>(null);
  // Closes the multiselect if click outside event.
  useOnClickOutside(ref, () => setIsOpen(false));

  const iconType = isOpen ? "minus" : "plus";

  function getButtonLabel(id: string) {
    let buttonLabel = label;
    if (selectedItems[id] !== undefined && selectedItems[id].items.length > 0) {
      buttonLabel = `${label} (${selectedItems[id].items.length})`;
    }
    return buttonLabel;
  }

  function isChecked(multiSelectId: string, itemId: string): boolean {
    if (
      selectedItems[multiSelectId]?.items.find(
        // @ts-ignore
        (selectedItemId: string) => selectedItemId === itemId
      )
    ) {
      return true;
    }
    return false;
  }

  // @TODO Temp workaround to render availability as radio not checkbox.
  function RadioOrCheckboxComponent(id: string, item: MultiSelectItem) {
    const itemId = `${item.name.replace(/\s+/g, "-").toLowerCase()}__${
      item.id
    }`;

    if (id === "availability") {
      return (
        <Radio
          id={itemId}
          labelText={item.name}
          showLabel={true}
          name={item.name}
          isChecked={isChecked(id, item.id) || false}
          onChange={handleOnSelectedItemChange}
        />
      );
    } else {
      return (
        <Checkbox
          id={itemId}
          labelText={item.name}
          showLabel={true}
          name={item.name}
          isChecked={isChecked(id, item.id) || false}
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
      <Box id={`multiselect-${id}`} className={s.multiSelect} ref={ref}>
        <button
          className={`${s.menuButton} ${hasSelectedItems() && s.active}`}
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>{getButtonLabel(id)}</span>
          <Icon
            decorative={true}
            // @ts-ignore
            name={iconType}
            // @ts-ignore
            modifiers={["small", { iconType }]}
          />
        </button>
        <div className={`${s.menu} ${isOpen && s.active}`}>
          <ul className={s.menuInner} role="dialog">
            {isOpen &&
              items.map((item: MultiSelectItem) => (
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
                        // @ts-ignore
                        labelText={<>{item.name}</>}
                        showLabel={true}
                        name={item.name}
                        /*isChecked={setMixedStateCheckboxCheckedProp(id, item) || false}
                        onChange={() => onChangeMixedStateCheckbox(id, item)}
                        */
                        isChecked={isChecked(id, item.id) || false}
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
                                // @ts-ignore
                                labelText={<>{childItem.name}</>}
                                showLabel={true}
                                name={childItem.name}
                                isChecked={isChecked(id, childItem.id) || false}
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
          {isOpen && !isMobile && (
            <div className={s.ctaButtonsContainer}>
              <Button
                buttonType={ButtonTypes.Link}
                id={`multiselect-button-clear-${id}`}
                className={s.ctaButtonsDesktopClear}
                mouseDown={false}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onClearMultiSelect();
                }}
              >
                Clear
              </Button>
              <Button
                buttonType={ButtonTypes.Primary}
                id={`multiselect-button-save-${id}`}
                mouseDown={false}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onSaveMultiSelect();
                }}
              >
                Apply Filters
              </Button>
            </div>
          )}
        </div>
      </Box>
    </FocusTrap>
  );
}

export default MultiSelect;
