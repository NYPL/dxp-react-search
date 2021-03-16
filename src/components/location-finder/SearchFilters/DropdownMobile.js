import React, { useContext } from 'react';
// Components
import Dropdown from '../../shared/Dropdown';
import CheckboxList from './CheckboxList';
// Context
import { SearchFiltersContext, useSearchFilters } from './SearchFiltersContext';
// Redux
import { useSelector } from 'react-redux';
// Utils
import { 
  setDropdownLabel, 
  setDropdownCheckedProp, 
  hasSelectedItems 
} from './SearchFiltersUtils';

function DropdownMobile(props) {
  // Context
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { dropdownIds } = state;
  // Props
  const { vocab } = props;
  // Redux
  const { searchFilters } = useSelector(state => state.search);

  function onChangeDropdown(vocabId, event) {
    const dropdownIdChecked = event.target.id;

    dispatch({
      type: 'SET_SELECTED_DROPDOWNS',
      payload: { 
        dropdownIdChecked: dropdownIdChecked,
        mode: 'mobile'
      }
    });
  }

  return (
    <Dropdown
      key={vocab.id}
      id={vocab.id}
      label={setDropdownLabel(vocab, searchFilters)}
      hasSelectedItems={hasSelectedItems(vocab, searchFilters)}
      checked={setDropdownCheckedProp(vocab.id, dropdownIds)}
      onChange={(e) => onChangeDropdown(vocab.id, e)}
    >
      <CheckboxList vocab={vocab} />
    </Dropdown>
  );
}

export default DropdownMobile;
