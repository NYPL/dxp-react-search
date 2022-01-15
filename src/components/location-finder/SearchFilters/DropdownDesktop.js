import React, { useContext } from "react";
// Components
import { Button, ButtonTypes } from "@nypl/design-system-react-components";
import Dropdown from "../../shared/Dropdown";
import CheckboxList from "./CheckboxList";
// Context
import { SearchFiltersContext } from "./SearchFiltersContext";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setFilters, deleteFilter } from "../../../redux/actions";
// Utils
import {
  setDropdownLabel,
  setDropdownCheckedProp,
  hasSelectedItems,
} from "./SearchFiltersUtils";

function DropdownDesktop(props) {
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { vocab } = props;
  const { dropdownIds, checkedTerms } = state;

  // Redux
  const reduxDispatch = useDispatch();
  const { searchFilters } = useSelector((state) => state.search);

  function onChangeDropdown(event, vocabId) {
    let dropdownIdChecked = event.target.id;

    dispatch({
      type: "SET_SELECTED_DROPDOWNS",
      payload: {
        dropdownIdChecked: dropdownIdChecked,
        vocabId: vocabId,
        savedItems: searchFilters,
        mode: "desktop",
      },
    });
  }

  // Saves the local state into Redux state.
  function onSaveFilters(vocabId) {
    // Check if there are no terms to save, and clear the state if so.
    if (
      checkedTerms[vocabId] !== undefined &&
      checkedTerms[vocabId].terms.length > 0
    ) {
      reduxDispatch(
        setFilters({
          searchFilters: {
            ...searchFilters,
            [vocabId]: {
              terms: checkedTerms[vocabId].terms,
            },
          },
        })
      );
    } else {
      reduxDispatch(
        deleteFilter({
          searchFilters: vocabId,
        })
      );
    }

    // Close the dropdown.
    dispatch({
      type: "SET_SELECTED_DROPDOWNS",
      payload: {
        vocabId: false,
        mode: "desktop",
      },
    });
  }

  // Clear the dropdown
  function onClickClear(vocabId, event) {
    // Clear context state for dropdown only by vocabId.
    dispatch({
      type: "RESET_SELECTED_ITEMS_BY_PARENT_ID",
      payload: {
        parentId: vocabId,
      },
    });

    // Remove from saved redux state.
    reduxDispatch(
      deleteFilter({
        searchFilters: vocabId,
      })
    );
  }

  return (
    <Dropdown
      key={vocab.id}
      id={vocab.id}
      label={setDropdownLabel(vocab, searchFilters)}
      checked={setDropdownCheckedProp(vocab.id, dropdownIds)}
      onChange={(e) => onChangeDropdown(e, vocab.id)}
      hasSelectedItems={hasSelectedItems(vocab, searchFilters)}
    >
      <div className="dropdown__content-inner">
        <CheckboxList vocab={vocab} />
      </div>
      <div className="dropdown__content-buttons" id={vocab.id}>
        <Button
          buttonType={ButtonTypes.Link}
          id={`button-clear-${vocab.id}`}
          mouseDown={false}
          type="button"
          onClick={(e) => onClickClear(vocab.id, e)}
          additionalStyles={{
            marginRight: "1rem",
          }}
        >
          Clear
        </Button>
        <Button
          buttonType={ButtonTypes.Primary}
          id={`button-save-${vocab.id}`}
          mouseDown={false}
          type="button"
          onClick={(e) => onSaveFilters(vocab.id)}
        >
          Apply Filters
        </Button>
      </div>
    </Dropdown>
  );
}

export default DropdownDesktop;
