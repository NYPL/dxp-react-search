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

function DropdownMobileClear() {
  // Context state.
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { checkedTerms } = state;
  // Redux
  const reduxDispatch = useDispatch();

  function onClick(event) {
    event.preventDefault();
    // Clear the Redux saved state.
    reduxDispatch(setFilters({
      searchFilters: []
    }));

    // Clear the context state for selectedItems.
    dispatch({
      type: 'RESET_SELECTED_ITEMS'
    });
    
    
    // Close modal
    //setIsModalOpen(true);
  }

  return (
    <div>
      {Object.keys(checkedTerms).length > 0 &&
        <Button
          buttonType="link"
          iconName={null}
          iconPosition={null}
          id="mobile-clear-all-button"
          mouseDown={false}
          onClick={(e) => onClick(e)}
          type="submit"
        >
          Clear all filters
        </Button>
      }
    </div>
  );
}

export default DropdownMobileClear;
