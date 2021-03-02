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

  /*function MultiSelectsDesktop(props) {
    return (

    );
  }
  */

  function stateReducer(state, actionAndChanges) {
    const { changes, type } = actionAndChanges;

    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        return {
          ...changes,
          isOpen: true, // Keep menu open after selection.
          highlightedIndex: state.highlightedIndex,
        }
      default:
        return changes;
    }
  }
  
  // @TODO these would have handle both desktop & mobile...
  function onClickSave(id, selectedItems) {
    console.log('onClickSave!');
    console.log(selectedItems);
  }

  function onClickClear(id, selectedItems) {
    console.log('onClickClear!');
    console.log(id);
    console.log(selectedItems);
  }
  
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
                customStateReducer={stateReducer}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
