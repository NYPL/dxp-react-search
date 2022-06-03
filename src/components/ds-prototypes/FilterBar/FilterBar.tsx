import * as React from "react";
// Components
import {
  Button,
  Heading,
  Icon,
  SelectedItems,
} from "@nypl/design-system-react-components";
import Modal from "./Modal";
// Styles
import s from "./FilterBar.module.css";
// Hooks
import useWindowSize from "./../../../hooks/useWindowSize";

interface FilterBarProps {
  id: string;
  label: string;
  selectedItems: SelectedItems;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onClear: () => void;
  onApply: () => void;
  children: React.ReactNode;
}

function FilterBar({
  id,
  label,
  selectedItems,
  isOpen,
  onToggle,
  onClose,
  onClear,
  onApply,
  children,
}: FilterBarProps) {
  const [isMobile, setIsMobile] = React.useState<boolean>();
  // Set the isMobile state based on screen width.
  const windowSize = useWindowSize();
  React.useEffect(() => {
    if (windowSize && windowSize >= 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  // Sets the label of the filters button.
  function setFilterButtonLabel(selectedItems: SelectedItems) {
    let allItems = [];
    for (let [_, value] of Object.entries(selectedItems)) {
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
            onClick={onToggle}
            buttonType="secondary"
            type="button"
          >
            {setFilterButtonLabel(selectedItems)}
          </Button>
          {isOpen && (
            <Modal>
              <div className={s.ctaButtonsContainerMobile}>
                <Button
                  id="multiselect-button-goback"
                  buttonType="link"
                  mouseDown={false}
                  onClick={onClose}
                  // additionalStyles
                  sx={{
                    display: "block",
                    width: "fit-content",
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
                  onClick={onApply}
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
                    buttonType="link"
                    className={s.clearAllFiltersButton}
                    mouseDown={false}
                    onClick={onClear}
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
