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

function SearchFilters() {
  // Hooks
  const windowSize = useWindowSize();
  // Redux
  const dispatch = useDispatch();
  const { searchFilters } = useSelector(state => state.search);
  // Local state
  const [checkedTerms, setCheckedTerms] = useState({});
  const [dropdownIds, setDropdownIds] = useState();
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
  
  // Generate the next state by removing an object property immutably.
  function newState(object, property) {
    let {[property]: omit, ...rest} = object;
    return rest;
  };
  
  // onChange handler for filter checkboxes.
  // Tracks checked items in local state.
  function onChangeFilters(vocabId, event, hasChildren) {
    if (hasChildren) {
      console.log('parent term!');
      console.log(hasChildren)
      // Don't store in state.
      // Function to check or uncheck all boxes.
    } /*else {*/
      const termId = event.target.id;
      let termIds;
      // Check if the tid already exists in the state
      if (checkedTerms[vocabId] !== undefined) {
        let termIdExists = checkedTerms[vocabId].terms.indexOf(termId) > -1;
        // Make a copy of the existing array.
        termIds = checkedTerms[vocabId].terms.slice();
        // If termId exists, remove it from the array.
        if (termIdExists) {
          termIds = termIds.filter((id) => id != termId);
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
    //}
  }
  
  // Clear the dropdown
  function onClickClear(vocabId, event) {    
    // Clear local state for dropdown only by vocabId.
    setCheckedTerms(
      newState(checkedTerms, vocabId)
    );

    // Redux
    dispatch(deleteFilter({
      searchFilters: vocabId
    }));

    // Close the dropdown.
    setDropdownIds(undefined);
  }
  
  // Saves the local state into Redux state.
  function onSaveFilters(vocabId, event) {
    dispatch(setFilters({
      searchFilters: {
        ...searchFilters,
        [vocabId]: {
          terms: checkedTerms[vocabId].terms
        }
      }
    }));
    // Close the dropdown.
    setDropdownIds(undefined);
  }
  
  // 
  function onChangeDropdown(vocabId, event) {
    // Dropdown local state.
    let dropdownIdChecked = event.target.id;
    let dropdownIdsCopy;
    if (dropdownIds !== undefined) {
      let dropdownIdExists = dropdownIds.indexOf(dropdownIdChecked) > -1;
      // Make a copy of the existing array.
      dropdownIdsCopy = dropdownIds.slice();
      // If dropdownIdExists exists, remove it from the array.
      if (dropdownIdExists) {
        dropdownIdsCopy = dropdownIdsCopy.filter((id) => id != dropdownIdChecked);
      } else {
        // Desktop
        if (windowSize >= 600) {
          // Desktop: only allow 1 item in the array.
          dropdownIdsCopy = [dropdownIdChecked];
        } else {
          // Mobile: allow multiple items in the array.
          dropdownIdsCopy.push(dropdownIdChecked);
        }
      }
    } else {
      // No dropdowns open, so add the checked dropdown to the array.
      dropdownIdsCopy = [dropdownIdChecked];
    }
    // Set the local state
    setDropdownIds(dropdownIdsCopy);
    
    // Desktop only
    if (windowSize >= 600) {
      // Reset the checkedTerms to saved redux state
      if (
        checkedTerms[vocabId] !== undefined
        && searchFilters[vocabId] !== undefined
      ) {
        setCheckedTerms({
          ...checkedTerms,
          [vocabId]: {
            terms: searchFilters[vocabId].terms
          }
        });
      } else {
        setCheckedTerms(
          newState(checkedTerms, vocabId)
        );
      }
    }
  }
  
  // Sets the dropdown label name with appended filter count.
  function setDropdownLabel(vocab, searchFilters) {
    let filterCount = '';
    if (
      searchFilters[vocab.id] !== undefined 
      && searchFilters[vocab.id].terms.length > 0
    ) {
      filterCount = `(${searchFilters[vocab.id].terms.length})`;
    }
    return `${vocab.name} ${filterCount}`;
  }
  
  //
  function setFilterCheckedProp(vocabId, termId) {
    let filterChecked = false;
    if (checkedTerms[vocabId] !== undefined) {
      filterChecked = checkedTerms[vocabId].terms.find((filter) => filter === termId) 
    }
    return filterChecked;
  }

  function setDropdownCheckedProp(vocabId) {
    let dropdownChecked = false;
    if (dropdownIds !== undefined && dropdownIds.indexOf(`dropdown-${vocabId}`) > -1) {
      dropdownChecked = true;
    }
    return dropdownChecked;
  }

  function onClearAllFilters(event) {
    // Clear the redux state.
    dispatch(setFilters({
      searchFilters: []
    }));
    // Close modal
    setIsModalOpen(false);
  }

  function onSaveAllFilters(event) {
    // Save the local state into redux.
    dispatch(setFilters({
      searchFilters: {
        ...searchFilters,
        ...checkedTerms
      }
    }));
    // Close modal
    setIsModalOpen(false);
    
    // @TODO Scroll to locations results.
  }

  // Returns true or false whether a dropdown has selectedItems.
  function hasSelectedItems(vocab, searchFilters) {
    let hasSelectedItems = false;
    if (
      searchFilters[vocab.id] !== undefined 
      && searchFilters[vocab.id].terms.length > 0
    ) {
      hasSelectedItems = true;
    }
    return hasSelectedItems;
  }

  function CheckboxList(props) {
    const { vocab } = props;
    return (
      <List 
        type='ul' 
        modifiers={['no-list-styling']}
      >
        {vocab.terms.map((term) => {
          return (
            <li key={term.id} className="term">
              <Checkbox
                checkboxId={term.id}
                labelOptions={{
                  labelContent: <>{term.name}</>
                }}
                name={term.name}
                checked={setFilterCheckedProp(vocab.id, term.id) || false}
                onChange={(e) => onChangeFilters(vocab.id, e, term.children)}
              />
                {term.children &&
                  <List 
                    type='ul' 
                    modifiers={['no-list-styling']}
                  >
                    {term.children.map((childTerm) => {
                      return (
                        <li key={childTerm.id} className="term-child">
                          <Checkbox
                            checkboxId={childTerm.id}
                            labelOptions={{
                              labelContent: <>{childTerm.name}</>
                            }}
                            name={childTerm.name}
                            checked={setFilterCheckedProp(vocab.id, childTerm.id) || false}
                            onChange={(e) => onChangeFilters(vocab.id, e)}
                          />
                        </li>
                      )
                    })}
                  </List>
                }
            </li>
          );
        })}
      </List>
    )
  }

  function DropdownMobile(props) {
    const { vocab } = props;
    return (
      <Dropdown
        key={vocab.id}
        id={vocab.id}
        label={setDropdownLabel(vocab, searchFilters)}
        checked={setDropdownCheckedProp(vocab.id)}
        onChange={(e) => onChangeDropdown(vocab.id, e)}
        hasSelectedItems={hasSelectedItems(vocab, searchFilters)}
      >
        <CheckboxList vocab={vocab} />
      </Dropdown>
    );
  }

  function DropdownDesktop(props) {
    const { vocab } = props;
    return (
      <Dropdown
        key={vocab.id}
        id={vocab.id}
        label={setDropdownLabel(vocab, searchFilters)}
        checked={setDropdownCheckedProp(vocab.id)}
        onChange={(e) => onChangeDropdown(vocab.id, e)}
        hasSelectedItems={hasSelectedItems(vocab, searchFilters)}
      >
        <div className="dropdown__content-inner">
          <CheckboxList vocab={vocab} />
        </div>
        <div 
          className="dropdown__content-buttons"
          id={vocab.id}
        >
          <Button
            buttonType="link"
            id={`button-clear-${vocab.id}`}
            mouseDown={false}
            type="button"
            onClick={(e) => onClickClear(vocab.id, e)}
          >
            Clear
          </Button>
          <Button
            buttonType="filled"
            id={`button-save-${vocab.id}`}
            mouseDown={false}
            type="button"
            onClick={(e) => onSaveFilters(vocab.id, e)}
          >
            Apply Filters
          </Button>
        </div>
      </Dropdown>
    );
  }

  return (
    <Fragment>
      {isMobile ? (
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
                  <DropdownMobile vocab={vocab} />
                )
              })}
            </Modal>
          )}
        </div>
      ) : (
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
                  <DropdownDesktop vocab={vocab} />
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
                  <DropdownDesktop vocab={vocab} />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SearchFilters;
