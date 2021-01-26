import React, { useState } from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { FiltersQuery as FILTERS_QUERY } from './SearchFilters.gql';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  setDropdownChecked,
  setFilters
} from './../../../redux/actions';
// Components
import { Button, Link } from '@nypl/design-system-react-components';
import Dropdown from './../../shared/Dropdown';

function SearchFilters() {
  // Redux
  const dispatch = useDispatch();
  const { dropdownId, searchFilters } = useSelector(state => state.search);
  // Local state
  const [checkedTerms, setCheckedTerms] = useState(false);
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

    setCheckedTerms({
      ...checkedTerms,
      [vocabId]: {
        terms: termIds
      }
    });
  }
  
  // Clear the dropdown
  function onClickClear(vocabId, event) {
    // Clear local state for dropdown only.
    setCheckedTerms({
      ...checkedTerms,
      [vocabId]: {
        terms: []
      }
    });
    // Clear the redux state for dropdown only, or just set redux to match local state?
    dispatch(setFilters({
      searchFilters: {
        ...searchFilters,
        [vocabId]: {
          terms: []
        }
      },
      // Close the dropdown
      dropdownId: false
    }));
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
  }
  
  // 
  function onChangeDropdown(vocabId, event) {
    let dropdownIdChecked = event.target.id;
    // User closed a dropdown from dropdown, so id will be the same.
    if (dropdownId === event.target.id) {
      dropdownIdChecked = false;
    }

    dispatch(setDropdownChecked({
      dropdownId: dropdownIdChecked
    }));

    // Reset the checkedTerms to saved redux state.
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
      setCheckedTerms({
        ...checkedTerms,
        [vocabId]: {
          terms: []
        }
      });
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

  return (
    <div className='search-filters' style={{display: "flex", width: "975px", marginTop: "1em"}}>
      {data.allTerms.slice(0, 10).map((vocab) => {
        return (
          <Dropdown
            key={vocab.id}
            id={vocab.id}
            label={setDropdownLabel(vocab, searchFilters)}
            checked={dropdownId === `dropdown-${vocab.id}`}
            onChange={(e) => onChangeDropdown(vocab.id, e)}
          >
            {vocab.terms.slice(0, 300).map((term) => {
              return (
                <div key={term.id} className="term">
                  <div className="checkbox">
                    <input
                      id={term.id}
                      className="checkbox__input"
                      type="checkbox"
                      name={term.name}
                      checked={checkedTerms[vocab.id] !== undefined ? 
                        checkedTerms[vocab.id].terms.find((filter) => filter === term.id) 
                        : false
                      }
                      onChange={(e) => onChangeFilters(vocab.id, e)}
                      aria-label="Checking this box will update the results"
                    />
                    <label
                      id="label"
                      htmlFor={term.name}
                      className="label"
                    >
                      {term.name}
                    </label>
                  </div>
                </div>
              );
            })}
            <div 
              className="dropdown__content-buttons"
              id={vocab.id}
              style={{
                display: 'flex',
                float: 'right',
                padding: '.25em 0'
              }
            }>
              <Button
                buttonType="link"
                id="button-cancel"
                mouseDown={false}
                type="button"
                onClick={(e) => onClickClear(vocab.id, e)}
              >
                Clear
              </Button>
              <Button
                buttonType="filled"
                id="dropdown-button"
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
