import React, { useContext } from 'react';
// Context
import { SearchFiltersContext } from './SearchFiltersContext';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../redux/actions';
// Components
import { 
  Button,
  Icon
} from '@nypl/design-system-react-components';

function FiltersButton(props) {
  // Context state.
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { checkedTerms } = state;
  // Props
  const { setIsModalOpen } = props;
  // Redux
  //const reduxDispatch = useDispatch();
  const { searchFilters } = useSelector(state => state.search);

  function onClick(event) {
    // Clear the context state for selectedItems.
    // @TODO You'd need a sync all context state from redux state?
    /*dispatch({
      type: 'RESET_SELECTED_ITEMS'
    });
    */

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
