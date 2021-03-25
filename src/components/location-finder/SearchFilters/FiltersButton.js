import React, { useContext } from 'react';
// Context
import { SearchFiltersContext } from './SearchFiltersContext';
// Redux
import { useSelector } from 'react-redux';
// Components
import { 
  Button,
  Icon
} from '@nypl/design-system-react-components';

function FiltersButton(props) {
  // Context state.
  const [state, dispatch] = useContext(SearchFiltersContext);
  // Props
  const { setIsModalOpen } = props;
  // Redux
  const { searchFilters } = useSelector(state => state.search);

  function onClick(event) {
    // Clear the context state for selectedItems.
    dispatch({
      type: 'SYNC_SELECTED_ITEMS_FROM_SAVED',
      payload: { 
        savedItems: searchFilters,
      }
    });
    
    // Close modal
    setIsModalOpen(true);
  }

  function setFiltersLabel(searchFilters) {    
    let allItems = [];
    for (let [key, value] of Object.entries(searchFilters)) {
      value.terms.map(term => {
        allItems.push(term);
      })
    }
    return `Filters ${allItems.length ? `(${allItems.length})` : ``}`;
  }

  function hasSelectedItems(searchFilters) {
    if (Object.keys(searchFilters).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={hasSelectedItems(searchFilters)
      ? `mobile-filters-button hasSelectedItems` 
      : `mobile-filters-button`}
    >
      <Button 
        id='search-filters__mobile-filters-button' 
        onClick={() => onClick()}
        buttonType='outline'
      >
        {setFiltersLabel(searchFilters)}
      </Button>
    </div>
  );
}

export default FiltersButton;
