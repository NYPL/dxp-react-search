import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import { 
  Button, 
  Heading, 
  Modal
} from '@nypl/design-system-react-components';
import MultiSelect from './MultiSelect';
// Hooks
import useWindowSize from '../../../hooks/useWindowSize';
import usePrevious from '../../../hooks/usePrevious';

function FilterBar(props) {
  const {
    
  } = props;

  /*
  label
  onClearMultiSelects
  onSaveMultiSelects

  onClickMobileFiltersButton

  isMobile

  */

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onClick() {
    setIsModalOpen(true)
  }

  return (
    <div>
      {isMobile ? (
        <div>
          <Button 
            id='search-filters__mobile-filters-button' 
            onClick={() => onClick()}
            buttonType='outline'
          >
            Filters
          </Button>
          {isModalOpen && (
            <Modal>
              <div>
                <Button
                  buttonType="link"
                  id={'multi-select-button-clear'}
                  mouseDown={false}
                  type="button"
                  onClick={(e) => onClearMultiSelects(e)}
                >
                  Clear
                </Button>
                <Button
                  buttonType="filled"
                  id={`multi-select-button-save`}
                  mouseDown={false}
                  type="button"
                  onClick={(e) => onSaveMultiSelects(e)}
                >
                  Apply Filters
                </Button>
              </div>
              <Heading
                id="search-filters__mobile-heading"
                level={3}
                text="Filters"
              />
              {children}
            </Modal>
          )}
        </div>
      ) : (
        <div>
          <Heading
            id="search-filters--heading"
            level={3}
            text="Filter By"
          />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em 0'
          }}>
            {children}
            <Button
              buttonType="link"
              id={'multi-select-button-clear'}
              mouseDown={false}
              type="button"
              onClick={(e) => onClearMultiSelects(e)}
            >
              Clear
            </Button>
            <Button
              buttonType="filled"
              id={`multi-select-button-save`}
              mouseDown={false}
              type="button"
              onClick={(e) => onSaveMultiSelects(e)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;