import React from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

function SearchFilters() {
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

  return (
    <div className='search-filters' style={{display: "flex"}}>
      {data.allTerms.map((vocab) => (
        <div key={vocab.id} className="vocab" style={{padding: "2em"}}>
          <h3>{vocab.name}</h3>
          {vocab.terms.slice(0, 10).map((term) => {
            return (
              <div key={term.id} className="term">
                <div className="checkbox">
                  <input
                    id={term.id}
                    className="checkbox__input"
                    type="checkbox"
                    name={term.name}
                    aria-label="Checking this box will update the results"
                  />
                  <label
                    id="label"
                    htmlFor={term.name}
                    className="label">
                    {term.name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SearchFilters;
