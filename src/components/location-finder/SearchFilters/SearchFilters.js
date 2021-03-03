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
  const [checkedTerms, setCheckedTerms] = useState({});
  const [dropdownIds, setDropdownIds] = useState();

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

  function stateReducer(state, actionAndChanges) {
    const { changes, type } = actionAndChanges;
  
    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        console.log(changes);
  
        return {
          ...changes,
          isOpen: true, // Keep menu open after selection.
          highlightedIndex: state.highlightedIndex,
        }
      default:
        return changes;
    }
  }

  function handleSelectedItemChange({ selectedItem }) {
    console.log('handleSelectedItemChange!');
    console.log(selectedItem);

    if (!selectedItem) {
      return
    }
    const index = selectedItems.indexOf(selectedItem)
    if (index > 0) {
      setSelectedItems([
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ])
    } else if (index === 0) {
      setSelectedItems([...selectedItems.slice(1)])
    } else {
      setSelectedItems([...selectedItems, selectedItem])
    }
    
    /*const selectedItemId = selectedItem.id;
    const vocabId = ''
    let termIds;
    // Check if the tid already exists in the state
    if (selectedItems[vocabId] !== undefined) {
      let exists = selectedItems[vocabId].terms.indexOf(selectedItemId) > -1;
      // Make a copy of the existing array.
      termIds = selectedItems[vocabId].terms.slice();
      // If termId exists, remove it from the array.
      if (termIdExists) {
        termIds = termIds.filter((id) => id != selectedItemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        termIds.push(termId);
      }
    } else {
      termIds = [];
      termIds.push(termId);
    }
    // Update local state.
    setCheckedTerms({
      ...checkedTerms,
      [vocabId]: {
        terms: termIds
      }
    });
    */
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
                  onClickSave={onClickSave}
                  onClickClear={onClickClear}
                  handleSelectedItemChange={handleSelectedItemChange}
                  controlledSelectedItems={selectedItems}
                  customStateReducer={stateReducer}
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
                  onClickSave={onClickSave}
                  onClickClear={onClickClear}
                  handleSelectedItemChange={handleSelectedItemChange}
                  controlledSelectedItems={selectedItems}
                  customStateReducer={stateReducer}
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
