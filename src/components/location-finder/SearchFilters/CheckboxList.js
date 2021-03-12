import React, { Fragment, useContext, useEffect, useState } from 'react';

// Components
import { Checkbox, List } from '@nypl/design-system-react-components';
//import Checkbox from './../../shared/Checkbox';

import { SearchFiltersContext, useSearchFilters } from './SearchFiltersContext';

function CheckboxList(props) {
  const [state, dispatch] = useContext(SearchFiltersContext);

  const { vocab } = props;
  const { checkedTerms } = state;

  function onChangeFilters(vocabId, event) {
    let selectedItemId = event.target.id;
    dispatch({
      type: 'SET_SELECTED_ITEMS',
      payload: { 
        selectedItemId: selectedItemId,
        parentId: vocabId
      }
    });
  }

  function setFilterCheckedProp(vocabId, termId) {
    let filterChecked = false;
    if (checkedTerms[vocabId] !== undefined) {
      filterChecked = checkedTerms[vocabId].terms.find((filter) => filter === termId) 
    }
    return filterChecked;
  }

  return (
    <List 
      type='ul' 
      modifiers={['no-list-styling']}
    >
      {vocab.terms.map((term) => {
        return (
          <li key={term.id} className="term">
            <Checkbox
              checkboxId={term.id}
              labelOptions={{
                labelContent: <>{term.name}</>
              }}
              name={term.name}
              checked={setFilterCheckedProp(vocab.id, term.id) || false}
              onChange={(e) => onChangeFilters(vocab.id, e)}
            />
              {term.children &&
                <List 
                  type='ul' 
                  modifiers={['no-list-styling']}
                >
                  {term.children.map((childTerm) => {
                    return (
                      <li key={childTerm.id} className="term-child">
                        <Checkbox
                          checkboxId={childTerm.id}
                          labelOptions={{
                            labelContent: <>{childTerm.name}</>
                          }}
                          name={childTerm.name}
                          checked={setFilterCheckedProp(vocab.id, childTerm.id) || false}
                          onChange={(e) => onChangeFilters(vocab.id, e)}
                        />
                      </li>
                    )
                  })}
                </List>
              }
          </li>
        );
      })}
    </List>
  )
}

export default CheckboxList;
