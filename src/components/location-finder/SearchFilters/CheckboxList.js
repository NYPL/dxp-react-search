import React, { useContext } from "react";
// Components
import { Checkbox, List } from "@nypl/design-system-react-components";
// Context
import { SearchFiltersContext } from "./SearchFiltersContext";

function CheckboxList(props) {
  const [state, dispatch] = useContext(SearchFiltersContext);
  const { vocab } = props;
  const { checkedTerms } = state;

  function onChangeFilters(vocabId, event) {
    const selectedItemId = event.target.id;
    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: {
        selectedItemId: selectedItemId,
        parentId: vocabId,
      },
    });
  }

  function setFilterCheckedProp(vocabId, termId) {
    let filterChecked = false;
    if (checkedTerms[vocabId] !== undefined) {
      filterChecked = checkedTerms[vocabId].terms.find(
        (filter) => filter === termId
      );
    }
    return filterChecked;
  }

  function setParentClassName(children) {
    let className = "term";
    if (children) {
      className = "term hasChildren";
    }
    return className;
  }

  return (
    <ul className="list list--no-list-styling" role="dialog">
      {vocab.terms.map((term) => {
        return (
          <li key={term.id} className={setParentClassName(term.children)}>
            <div className="checkbox">
              <Checkbox
                id={term.id}
                labelText={<>{term.name}</>}
                showLabel={true}
                name={term.name}
                isChecked={setFilterCheckedProp(vocab.id, term.id) || false}
                onChange={(e) => onChangeFilters(vocab.id, e)}
              />
            </div>
            {term.children && (
              <List type="ul" modifiers={["no-list-styling"]}>
                {term.children.map((childTerm) => {
                  return (
                    <li key={childTerm.id} className="term-child">
                      <div className="checkbox">
                        <Checkbox
                          id={childTerm.id}
                          labelText={<>{childTerm.name}</>}
                          showLabel={true}
                          name={childTerm.name}
                          isChecked={
                            setFilterCheckedProp(vocab.id, childTerm.id) ||
                            false
                          }
                          onChange={(e) => onChangeFilters(vocab.id, e)}
                        />
                      </div>
                    </li>
                  );
                })}
              </List>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default CheckboxList;
