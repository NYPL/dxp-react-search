import React, { createContext, useContext, useReducer } from "react";
import isEqual from "lodash.isequal";

const initialState = {
  checkedTerms: {},
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_DROPDOWNS": {
      let dropdownIdChecked = action.payload.dropdownIdChecked;
      const savedItems = action.payload.savedItems;
      const vocabId = action.payload.vocabId;

      let dropdownIdsCopy;

      let mode = action.payload.mode;

      const nextState = (object, property) => {
        let { [property]: omit, ...rest } = object;
        return rest;
      };

      if (state.dropdownIds !== undefined) {
        let dropdownIdExists =
          state.dropdownIds.indexOf(dropdownIdChecked) > -1;
        // Make a copy of the existing array.
        dropdownIdsCopy = state.dropdownIds.slice();
        // If dropdownIdExists exists, remove it from the array.
        if (dropdownIdExists) {
          dropdownIdsCopy = dropdownIdsCopy.filter(
            (id) => id != dropdownIdChecked
          );
        } else {
          // Desktop
          if (mode === "desktop") {
            // Desktop: only allow 1 item in the array.
            dropdownIdsCopy = [dropdownIdChecked];
          } else {
            // Mobile: allow multiple items in the array.
            dropdownIdsCopy.push(dropdownIdChecked);
          }
        }
      } else {
        // No dropdowns open, so add the checked dropdown to the array.
        dropdownIdsCopy = [dropdownIdChecked];
      }

      // Desktop logic only for clearing/restoring unsaved/saved selectedItems.
      if (mode === "desktop") {
        // Restore context state to redux state.
        if (
          // Check if we have any savedItems.
          savedItems !== undefined &&
          // Check if we have any savedItems for this parent group.
          savedItems.hasOwnProperty(vocabId) &&
          // Check if the two state objects are not equal.
          !isEqual(state.checkedTerms, savedItems)
        ) {
          return {
            ...state,
            dropdownIds: dropdownIdsCopy,
            checkedTerms: {
              ...state.checkedTerms,
              [vocabId]: {
                terms: savedItems[vocabId].terms,
              },
            },
          };
          // Parent group has no saved items, so we clear the unsaved context state.
        } else if (
          // Check if we have any savedItems.
          savedItems !== undefined &&
          // Check if we have any savedItems for this parent group.
          !savedItems.hasOwnProperty(vocabId)
        ) {
          return {
            ...state,
            dropdownIds: dropdownIdsCopy,
            checkedTerms: nextState(state.checkedTerms, vocabId),
          };
        }
      }

      // Mobile only
      return {
        ...state,
        dropdownIds: dropdownIdsCopy,
      };
    }

    case "SET_SELECTED_ITEMS": {
      const termId = action.payload.selectedItemId;
      const vocabId = action.payload.parentId;

      const nextState = (object, property) => {
        let { [property]: omit, ...rest } = object;
        return rest;
      };

      let termIds;
      // Check if the tid already exists in the state
      if (state.checkedTerms[vocabId] !== undefined) {
        let termIdExists =
          state.checkedTerms[vocabId].terms.indexOf(termId) > -1;
        // Make a copy of the existing array.
        termIds = state.checkedTerms[vocabId].terms.slice();
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

      // Check if there are no terms to save, and clear the state if so.
      if (termIds.length == 0) {
        return {
          ...state,
          checkedTerms: nextState(state.checkedTerms, vocabId),
        };
      } else {
        return {
          ...state,
          checkedTerms: {
            ...state.checkedTerms,
            [vocabId]: {
              terms: termIds,
            },
          },
        };
      }
    }

    case "RESET_SELECTED_ITEMS_BY_PARENT_ID": {
      const parentId = action.payload.parentId;

      // @TODO move to util function?!
      const nextState = (object, property) => {
        let { [property]: omit, ...rest } = object;
        return rest;
      };

      return {
        ...state,
        checkedTerms: nextState(state.checkedTerms, parentId),
        dropdownIds: undefined,
      };
    }

    case "RESET_SELECTED_ITEMS": {
      return {
        ...state,
        checkedTerms: {},
        dropdownIds: undefined,
      };
    }

    case "SYNC_SELECTED_ITEMS_FROM_SAVED": {
      const savedItems = action.payload.savedItems;
      // Restore context state to redux state.
      if (
        // Check if the two state objects are not equal.
        !isEqual(state.checkedTerms, savedItems)
      ) {
        return {
          ...state,
          checkedTerms: {
            ...savedItems,
          },
          dropdownIds: undefined,
        };
      }

      return {
        ...state,
        dropdownIds: undefined,
      };
    }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

const SearchFiltersContext = createContext();

function useSearchFilters() {
  const context = useContext(SearchFiltersContext);

  if (!context) {
    throw new Error(
      `useSearchFilters must be used within a SearchFiltersProvider`
    );
  }

  return context;
}

function SearchFiltersProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchFiltersContext.Provider value={[state, dispatch]}>
      {props.children}
    </SearchFiltersContext.Provider>
  );
}

export { SearchFiltersContext, SearchFiltersProvider, useSearchFilters };
