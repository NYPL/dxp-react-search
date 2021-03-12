import React, { useContext } from 'react';
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
import CheckboxList from './CheckboxList';

// Hooks
import { SearchFiltersContext, useSearchFilters } from './SearchFiltersContext';
import useWindowSize from '../../../hooks/useWindowSize';

// Redux
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  setFilters,
  deleteFilter
} from '../../../redux/actions';

// Utils
import { 
  setDropdownLabel, 
  setDropdownCheckedProp, 
  hasSelectedItems 
} from './SearchFiltersUtils';

function DropdownMobile(props) {
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { dropdownIds } = state;
  //
  const { vocab } = props;

  // Redux
  const reduxDispatch = useDispatch();
  const { searchFilters } = useSelector(state => state.search);

  function onChangeDropdown(vocabId, event) {
    let dropdownIdChecked = event.target.id;

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
