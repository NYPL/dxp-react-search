import React, { useState } from 'react';
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
} from './../../../redux/actions';
// Components
import { Button, Link, Modal } from '@nypl/design-system-react-components';
import Dropdown from './../../shared/Dropdown';
import Checkbox from './../../shared/Checkbox';
// Hooks
import useWindowSize from './../../../hooks/useWindowSize';

function SearchFilters() {
  // Hooks
  const windowSize = useWindowSize();
  // Redux
  const dispatch = useDispatch();
  const { searchFilters } = useSelector(state => state.search);
  // Local state
  const [checkedTerms, setCheckedTerms] = useState({});
  const [dropdownIds, setDropdownIds] = useState();
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
      <div>Loading filters!</div>
    );
  }
  
  // Helper function to generate a new state with a property removed immutably.
  function newState(object, property) {
    let {[property]: omit, ...rest} = object;
    return rest;
  };
  
  // onChange handler for filter checkboxes.
  // Tracks checked items in local state.
  function onChangeFilters(vocabId, event) {
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

  return (
    <div className='search-filters'>
      {data.allTerms.slice(0, 10).map((vocab) => {
        return (
          <Dropdown
            key={vocab.id}
            id={vocab.id}
            label={setDropdownLabel(vocab, searchFilters)}
            checked={setDropdownCheckedProp(vocab.id)}
            onChange={(e) => onChangeDropdown(vocab.id, e)}
          >
            {vocab.terms.slice(0, 300).map((term) => {
              return (
                <div key={term.id} className="term">
                  <Checkbox
                    id={term.id}
                    name={term.name}
                    checked={setFilterCheckedProp(vocab.id, term.id) || false}
                    onChange={(e) => onChangeFilters(vocab.id, e)}
                  />
                </div>
              );
            })}
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
        )
      })}
    </div>
  );
};

export default SearchFilters;
