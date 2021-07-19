import React from 'react';
// Components
import { 
  Button, 
  Heading,
  Icon,
  Modal
} from '@nypl/design-system-react-components';
// Styles
import s from './FilterBar.module.css';

function FilterBar(props) {
  const {
    id,
    label,
    isModalOpen,
    onClickMobileFiltersButton,
    onClickGoBack,
    isMobile,
    selectedItems,
    onClearSelectedItems,
    onSaveSelectedItems,
    children
  } = props;
  
  // Sets the label of the filters button.
  function setFilterButtonLabel(selectedItems) {    
    let allItems = [];
    for (let [key, value] of Object.entries(selectedItems)) {
      value.items.map(item => {
        allItems.push(item);
      })
    }
    return `Filters ${allItems.length ? `(${allItems.length})` : ``}`;
  }

  return (
    <div id={id} className={s.container}>
      {isMobile ? (
        <div className={s.mobileContainer}>
          <Button 
            id='search-filters__mobile-filters-button'
            className={s.filterBarButtonMobile}
            onClick={onClickMobileFiltersButton}
            buttonType='outline'
            type='button'
          >
            {setFilterButtonLabel(selectedItems)}
          </Button>
          {isModalOpen && (
            <Modal>
              <div className={s.ctaButtonsContainerMobile}>
                <Button
                  buttonType="link"
                  className={s.ctaClearButtonMobile}
                  id={'multiselect-button-goback'}
                  mouseDown={false}
                  type="button"
                  onClick={onClickGoBack}
                >
                  <Icon
                    decorative
                    iconRotation="rotate-90"
                    modifiers={[
                      'small'
                    ]}
                    name="arrow"
                  />
                  Go Back
                </Button>
                <Button
                  buttonType="filled"
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
                {Object.keys(selectedItems).length > 0 &&
                  <Button
                    buttonType="link"
                    iconName={null}
                    iconPosition={null}
                    id="mobile-clear-all-button"
                    className={s.clearAllFiltersButton}
                    mouseDown={false}
                    onClick={onClearSelectedItems}
                    type="submit"
                  >
                    Clear all filters
                  </Button>
                }
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <div className={s.desktopContainer}>
          <Heading
            id="search-filters--heading"
            level={3}
            text={label}
          />
          <div className={s.multiSelectsContainerDesktop}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;