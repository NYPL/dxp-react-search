import React, { Fragment, useEffect, useState } from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { FiltersQuery as FILTERS_QUERY } from './SearchFilters.gql';
// Redux
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  setFilters,
  deleteFilter
} from '../../../redux/actions';
// Components
import { 
  Button, 
  Checkbox, 
  Heading, 
  Icon,
  List,
  Modal, 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import Dropdown from '../../shared/Dropdown';
//import Checkbox from './../../shared/Checkbox';
// Hooks
import useWindowSize from '../../../hooks/useWindowSize';

import MultiSelect from './../../shared/MultiSelect';

function SearchFilters() {
  // Hooks
  const windowSize = useWindowSize();
  // Redux
  const dispatch = useDispatch();
  const { searchFilters } = useSelector(state => state.search);
  // Local state
  const [selectedItems, setSelectedItems] = useState([]);

  // Local state: mobile, modal.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState();
	const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Set the isMobile state based on screen width.
  useEffect(() => {
    if (windowSize >= 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  // Query for data.
  const { loading, error, data } = useQuery(
    FILTERS_QUERY, {}
  );

  // Error state.
  if (error) {
    return (
      <div>'error while loading filters'</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <SkeletonLoader />
    );
  }

  function handleOnStateChange(changes) {
    const { type } = changes;    
    switch (type) {
      case '__item_click__':
      case '__menu_keydown_enter__':
      case '__menu_keydown_space_button__':
        onItemChange(changes.selectedItem);
        break;
    }
  }

  function onItemChange(item) {
    const itemId = item.id;
    let itemIds;
    // Check if the tid already exists in the state
    if (selectedItems[item.vocabId] !== undefined) {
      let itemIdExists = selectedItems[item.vocabId].terms.indexOf(itemId) > -1;
      // Make a copy of the existing array.
      itemIds = selectedItems[item.vocabId].terms.slice();
      // If itemId exists, remove it from the array.
      if (itemIdExists) {
        itemIds = itemIds.filter((id) => id != itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }
    // Update local state.
    setSelectedItems({
      ...selectedItems,
      [item.vocabId]: {
        terms: itemIds
      }
    });
  }

  function handleOnChecked(id, selectedItemId) {
    let filterChecked = false;
    if (selectedItems[id] !== undefined) {
      filterChecked = selectedItems[id].terms.find((filter) => filter === selectedItemId) 
    }
    return filterChecked;
  }

  // @TODO these would have handle both desktop & mobile...
  function onClickSave(id, selectedItems) {
    console.log('onClickSave!');
    console.log(selectedItems);
    
    let terms = [];
    selectedItems.map((selectedItem) => {
      terms.push(selectedItem.id)
    });
    
    // Save to redux.
    dispatch(setFilters({
      searchFilters: {
        ...searchFilters,
        [id]: {
          terms: terms
        }
      }
    }));
  }

  function onClickClear(id, selectedItems) {
    console.log('onClickClear!');
    console.log(id);
    console.log(selectedItems);
  }

  function MultiSelectDesktop() {
    console.log(selectedItems);

    return (
      <div className='search-filters'>
        <div className='search-filters__group1'>
          <Heading
            className="search-filters-group__heading"
            id="search-filters-group1__heading"
            level={3}
            text="Filters"
          />
          <div className='search-filters__dropdowns'>
            {data.allTerms.slice(0, 3).map((vocab) => {
              return (
                <MultiSelect
                  id={vocab.id}
                  label={vocab.name}
                  items={vocab.terms}
                  controlledSelectedItems={selectedItems}
                  handleOnStateChange={handleOnStateChange}
                  handleOnChecked={handleOnChecked}
                />
              )
            })}
          </div>
        </div>
        <div className='search-filters__group2'>
          <Heading
            className="search-filters-group__heading"
            id="search-filters-group2__heading"
            level={3}
            text="Research Filters"
          />
          <div className='search-filters__dropdowns'>
            {data.allTerms.slice(3, 5).map((vocab) => {
              return (
                <MultiSelect 
                  id={vocab.id}
                  label={vocab.name}
                  items={vocab.terms}
                  controlledSelectedItems={selectedItems}
                  handleOnStateChange={handleOnStateChange}
                  handleOnChecked={handleOnChecked}
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  function MultiSelectMobile() {
    return (
      <div className='search-filters__mobile'>
        <Button 
          id='search-filters__mobile-filters-button' 
          onClick={openModal}
          buttonType='outline'
        >
          Filters
        </Button>
        {isModalOpen && (
          <Modal>
            <div 
              className="dropdown__content-buttons"
            >
              <Button
                buttonType="link"
                id={'button-clear-all'}
                mouseDown={false}
                type="button"
                onClick={(e) => onClearAllFilters(e)}
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
                id={'button-save-all'}
                mouseDown={false}
                type="button"
                onClick={(e) => onSaveAllFilters(e)}
              >
                Show Results
              </Button>
            </div>
            <Heading
              id="search-filters__mobile-heading"
              level={3}
              text="Filters"
            />
              {data.allTerms.map((vocab) => {
                return (
                  <MultiSelect 
                    id={vocab.id}
                    label={vocab.name}
                    items={vocab.terms}
                    onClickSave={onClickSave}
                    onClickClear={onClickClear}
                    customStateReducer={stateReducer}
                  />
                )
              })}
          </Modal>
        )}
      </div>
    );
  }
  
  return (
    <Fragment>
      {isMobile ? (
        <MultiSelectMobile />
      ) : (
        <MultiSelectDesktop />
      )}
    </Fragment>
  );
};

export default SearchFilters;
