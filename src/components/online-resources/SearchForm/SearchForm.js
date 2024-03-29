import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setAutoSuggestInputValue } from "./../../../redux/actions";
// Apollo
import { gql, useApolloClient } from "@apollo/client";
// Utils
import filterBySearchInput from "./../../../utils/filterBySearchInput";
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";
// Components
import { default as SharedSearchForm } from "./../../shared/SearchForm";
import { default as SharedFilterBar } from "./../../shared/FilterBar";

export const AUTO_SUGGEST_QUERY = gql`
  query AutoSuggestQuery {
    allAutoSuggestions {
      name
    }
  }
`;

function SearchForm() {
  const router = useRouter();
  // Local state
  // Filtered items based on search input.
  const [suggestions, setSuggestions] = useState([]);
  // All possible items from datasource.
  const [autoSuggestItems, setAutoSuggestItems] = useState();
  // Redux
  const { autoSuggestInputValue } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  // Apollo
  const client = useApolloClient();

  // When component mounts, prefetch the items for autosuggest.
  useEffect(() => {
    client.query({ query: AUTO_SUGGEST_QUERY }).then(
      (response) => {
        setAutoSuggestItems(response.data.allAutoSuggestions);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [autoSuggestItems, client]);

  // @TODO Bad idea? sync the router state to redux?
  useEffect(() => {
    if (router.query.q) {
      dispatch(setAutoSuggestInputValue(router.query.q));
    }
  }, [dispatch, router.query.q]);

  function getSuggestions(autoSuggestItems, value) {
    if (autoSuggestItems) {
      return filterBySearchInput(autoSuggestItems, value);
    } else {
      console.log("data is false");
      return [];
    }
  }

  function onSuggestionsFetchRequested(value) {
    dispatch(setAutoSuggestInputValue(value));
    setSuggestions(getSuggestions(autoSuggestItems, value));
  }

  function onSuggestionSelected(event, { suggestion }) {
    return null;
  }

  function inputOnChange(newValue) {
    dispatch(setAutoSuggestInputValue(newValue));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Push form state into url.
    router.push({
      pathname: `${ONLINE_RESOURCES_BASE_PATH}/search`,
      query: {
        q: autoSuggestInputValue,
        page: 1,
        ...(router.query.subject && {
          subject: router.query.subject,
        }),
        ...(router.query.audience_by_age && {
          audience_by_age: router.query.audience_by_age,
        }),
        ...(router.query.availability && {
          availability: router.query.availability,
        }),
      },
    });
  }

  return (
    <SharedSearchForm
      id="search-form"
      label={"Search for broad subject terms or database by name."}
      ariaLabel={"Find your online resource"}
      onSubmit={handleSubmit}
      autoSuggestInputId={"search-form__search-input"}
      autoSuggestAriaLabel={"Search articles and databases"}
      suggestions={suggestions}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      autoSuggestInputValue={autoSuggestInputValue}
      inputOnChange={inputOnChange}
      suggestionContainerMsg={"You searched for:"}
      searchButtonId={"search-form__submit"}
    >
      <SharedFilterBar
        id="online-resources__search-filters"
        label="Filter By"
        routerPathname={`${ONLINE_RESOURCES_BASE_PATH}/search`}
        searchQuery={true}
        groups={[
          {
            id: "subject",
            label: "Subjects",
            type: "taxonomy",
            limiter: "online_resource",
          },
          {
            id: "audience_by_age",
            label: "Audience",
            type: "taxonomy",
            includeChildren: false,
          },
          {
            id: "availability",
            label: "Availability",
            type: "taxonomy",
            includeChildren: false,
            customData: true,
          },
        ]}
      />
    </SharedSearchForm>
  );
}

export default SearchForm;
