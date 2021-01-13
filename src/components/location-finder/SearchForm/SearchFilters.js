import React from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import { setFilters } from './../../../redux/actions';
// Components
import { Button, Link } from '@nypl/design-system-react-components';
import Dropdown from './../../shared/Dropdown';

function SearchFilters() {
  // Redux
  const dispatch = useDispatch();
  const { searchFilters } = useSelector(state => state.search);

  const FILTERS_QUERY = gql`
    query {
      allTerms {
        id
        name
        terms {
          id
          name
        }
      }
    }
  `;

  // Query for data.
  const { loading, error, data } = useQuery(
    FILTERS_QUERY, {}
  );

  // Error state.
  if (error) {
    return (
      <div>'error while loading filters'</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div>Loading filters!</div>
    );
  }

  function onChangeFilters(event) {
    dispatch(setFilters({
      searchFilters: event.target.id
    }));
  }

  function onClickCancel(event) {

  }

  return (
    <div className='search-filters' style={{display: "flex", width: "975px", marginTop: "1em"}}>
      {data.allTerms.slice(0, 10).map((vocab) => (
        <Dropdown
          id={vocab.id}
          label={vocab.name}
        >
          {vocab.terms.slice(0, 300).map((term) => {
            return (
              <div key={term.id} className="term">
                <div className="checkbox">
                  <input
                    id={term.id}
                    className="checkbox__input"
                    type="checkbox"
                    name={term.name}
                    checked={searchFilters.find(filter => filter === term.id)}
                    onChange={onChangeFilters}
                    aria-label="Checking this box will update the results"
                  />
                  <label
                    id="label"
                    htmlFor={term.name}
                    className="label"
                  >
                    {term.name}
                  </label>
                </div>
              </div>
            );
          })}
          <div className="dropdown__content-buttons">
            <Link
              href={onClickCancel}
            >
              Cancel
            </Link>
            <Button
              buttonType="filled"
              id="button"
              mouseDown={false}
              type="submit"
            >
              Save
            </Button>
          </div>
        </Dropdown>
      ))};
    </div>
  );
};

export default SearchFilters;
