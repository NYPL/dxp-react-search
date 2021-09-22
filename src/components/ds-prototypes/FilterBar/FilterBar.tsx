import React from "react";
// Components
import {
  Button,
  ButtonTypes,
  Heading,
  Icon,
  IconRotationTypes,
  Modal,
} from "@nypl/design-system-react-components";
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
    let allItems = [];
    for (let [key, value] of Object.entries(selectedItems)) {
      value.items.map((item) => {
        allItems.push(item);
      });
    }
    return `Filters ${allItems.length ? `(${allItems.length})` : ``}`;
  }

  return (
    <div id={id} className={s.container}>
      {isMobile ? (
        <div className={s.mobileContainer}>
          <Button
            id="search-filters__mobile-filters-button"
            className={s.filterBarButtonMobile}
            onClick={onClickMobileFiltersButton}
            buttonType={ButtonTypes.Secondary}
            type="button"
          >
            {setFilterButtonLabel(selectedItems)}
          </Button>
          {isModalOpen && (
            <Modal>
              <div className={s.ctaButtonsContainerMobile}>
                <Button
                  buttonType={ButtonTypes.Link}
                  className={s.ctaClearButtonMobile}
                  id={"multiselect-button-goback"}
                  mouseDown={false}
                  type="button"
                  onClick={onClickGoBack}
                >
                  <Icon
                    decorative
                    iconRotation={IconRotationTypes.rotate90}
                    modifiers={["small"]}
                    //name="arrow"
                  />
                  Go Back
                </Button>
                <Button
                  // filled
                  buttonType={ButtonTypes.Primary}
                  id={`multiselect-button-save`}
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
                  level={3}
                  text="Filters"
                />
                {children}
                {Object.keys(selectedItems).length > 0 && (
                  <Button
                    buttonType={ButtonTypes.Link}
                    //iconName={null}
                    //iconPosition={null}
                    id="mobile-clear-all-button"
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
            className={s.filterBarHeading}
            level={2}
            text={label}
          />
          <div className={s.multiSelectsContainerDesktop}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
