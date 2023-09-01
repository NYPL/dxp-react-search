import React from "react";
import { useRouter } from "next/router";

// Apollo
import { gql, useQuery } from "@apollo/client";
import { Box, Button, TextInput } from "@nypl/design-system-react-components";
import SearchHeader from "../../shared/SearchHeader";
import FilterBar from "../../shared/FilterBar";
import { EVENTS_BASE_PATH } from "../../../utils/config";

export const FILTERS_QUERY = gql`
  query FiltersQuery($limit: Int, $pageNumber: Int) {
    localistAllTerms(limit: $limit, pageNumber: $pageNumber) {
      id
      label
      items {
        id
        name
      }
    }
  }
`;

interface SearchFormProps {
  id: string;
  ariaLabel: string;
}

export default function SearchFrom({ id, ariaLabel }: SearchFormProps) {
  const router = useRouter();
  const [searchVal, setSearchVal] = React.useState(router.query.q || "");

  const handleOnChange = (e: any) => {
    setSearchVal(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target);

    router.push({
      pathname: `${EVENTS_BASE_PATH}/search`,
      query: { ...router.query, q: searchVal },
    });
  };

  const { loading, error, data } = useQuery(FILTERS_QUERY, {
    variables: {
      limit: 200,
      pageNumber: 1,
    },
  });

  if (error) {
    return <div>Error while loading events.</div>;
  }
  if (loading || !data) {
    return <div>...loading</div>;
  }

  return (
    <SearchHeader>
      <Box maxWidth="1280px" width="100%" px="s">
        <form
          id={id}
          role="search"
          aria-label={ariaLabel}
          onSubmit={handleSubmit}
        >
          <Box display="flex" alignItems="end" width="100%">
            <TextInput
              width="100%"
              id="event-search-bar-input"
              labelText="Event Search Input"
              value={searchVal as string}
              placeholder="Enter Event Keyword"
              onChange={handleOnChange}
            />
            <Button id="event-search-button" type="submit" minWidth="100px">
              Submit
            </Button>
          </Box>
          <FilterBar
            id="events-calendar-filter-bar"
            label="Filter By"
            searchQuery={true}
            routerPathname={`${EVENTS_BASE_PATH}/search`}
            groups={data.localistAllTerms}
          />
        </form>
      </Box>
    </SearchHeader>
  );
}
