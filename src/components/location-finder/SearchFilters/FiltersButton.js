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

  return (
    <Button 
      id='search-filters__mobile-filters-button' 
      onClick={() => onClick()}
      buttonType='outline'
    >
      Filters
    </Button>
  );
}

export default FiltersButton;
