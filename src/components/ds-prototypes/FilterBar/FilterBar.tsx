import React from "react";
// Components
import { Button, Heading, Icon } from "@nypl/design-system-react-components";
import Modal from "./Modal";
// Styles
import s from "./FilterBar.module.css";

interface FilterBarProps {
  id: string;
  label: string;
  isModalOpen: boolean;
  onClickMobileFiltersButton: () => void;
  onClickGoBack: () => void;
  isMobile: boolean;
  selectedItems: FbSelectedItems;
  onClearSelectedItems: () => void;
  onSaveSelectedItems: () => void;
  children: React.ReactNode;
}

interface FbSelectedItems {
  [name: string]: { items: string[] };
}

function FilterBar({
  id,
  label,
  isModalOpen,
  onClickMobileFiltersButton,
  onClickGoBack,
  isMobile,
  selectedItems,
  onClearSelectedItems,
  onSaveSelectedItems,
  children,
}: FilterBarProps) {
  // Sets the label of the filters button.
  function setFilterButtonLabel(selectedItems: FbSelectedItems) {
    const allItems = [];
    /* eslint-disable @typescript-eslint/no-unused-vars */
    for (const [_, value] of Object.entries(selectedItems)) {
      value.items.map((item) => {
        allItems.push(item);
      });
    }
    return `Filters ${allItems.length ? `(${allItems.length})` : ""}`;
  }

  return (
    <div id={id} className={s.container}>
      {isMobile ? (
        <div className={s.mobileContainer}>
          <Button
            id="search-filters__mobile-filters-button"
            className={s.filterBarButtonMobile}
            onClick={onClickMobileFiltersButton}
            buttonType="secondary"
            type="button"
          >
            {setFilterButtonLabel(selectedItems)}
          </Button>
          {isModalOpen && (
            <Modal>
              <div className={s.ctaButtonsContainerMobile}>
                <Button
                  id="multiselect-button-goback"
                  buttonType="text"
                  mouseDown={false}
                  onClick={onClickGoBack}
                  // additionalStyles
                  sx={{
                    display: "block",
                    width: "fit-content",
                    paddingLeft: "0px",
                  }}
                >
                  <Icon
                    name="arrow"
                    align="left"
                    iconRotation="rotate90"
                    size="small"
                  />
                  Go Back
                </Button>
                <Button
                  id="multiselect-button-save"
                  buttonType="primary"
                  mouseDown={false}
                  type="button"
                  onClick={onSaveSelectedItems}
                >
                  Show Results
                </Button>
              </div>
              <div className={s.multiSelectsContainerMobile}>
                <Heading
                  id="search-filters__mobile-heading"
                  level="three"
                  text="Filters"
                />
                {children}
                {Object.keys(selectedItems).length > 0 && (
                  <Button
                    id="mobile-clear-all-button"
                    buttonType="text"
                    className={s.clearAllFiltersButton}
                    mouseDown={false}
                    onClick={onClearSelectedItems}
                    type="submit"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <div className={s.desktopContainer}>
          <Heading
            id="search-filters--heading"
            //className={s.filterBarHeading}
            level="two"
            size="tertiary"
            text={label}
          />
          <div className={s.multiSelectsContainerDesktop}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
