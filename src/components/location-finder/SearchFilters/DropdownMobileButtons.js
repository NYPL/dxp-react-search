import React, { useContext } from 'react';
// Context
import { SearchFiltersContext } from './SearchFiltersContext';
// Redux
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../redux/actions';
// Components
import { 
  Button,
  Icon
} from '@nypl/design-system-react-components';

function DropdownMobileButtons(props) {
  // Context state.
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { checkedTerms } = state;
  // Props
  const { setIsModalOpen } = props;
  // Redux
  const reduxDispatch = useDispatch();

  function onClearAllFilters(event) {
    // Clear the redux state.
    /*reduxDispatch(setFilters({
      searchFilters: []
    }));

    // Clear the context state for selectedItems.
    dispatch({
      type: 'RESET_SELECTED_ITEMS'
    });
    */
    
    // Close modal
    setIsModalOpen(false);
  }

  function onSaveAllFilters(event) {
    // Save the local state into redux.
    // @TODO this works without the searchFilters spread, but are we mutating?
    reduxDispatch(setFilters({
      searchFilters: {
        //...searchFilters,
        ...checkedTerms
      }
    }));
    
    // Close modal
    setIsModalOpen(false);
    
    // @TODO Scroll to locations results.
  }

  return (
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
        onClick={(e) => {
          onSaveAllFilters(e)
        }}
      >
        Show Results
      </Button>
    </div>
  );
}

export default DropdownMobileButtons;
