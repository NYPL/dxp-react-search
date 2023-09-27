import * as React from "react";
import { useRouter } from "next/router";
import { Box, Button, TextInput } from "@nypl/design-system-react-components";
import SearchHeader from "../../shared/SearchHeader";
import FilterBar from "../../shared/FilterBar";
import { EVENTS_BASE_PATH } from "../../../utils/config";

interface SearchFormProps {
  id: string;
  ariaLabel: string;
}

export default function SearchFrom({ id, ariaLabel }: SearchFormProps) {
  const router = useRouter();
  const [searchVal, setSearchVal] = React.useState("");

  // Sync router query param state with React state.
  // @TODO this doesnt seem to work.
  React.useEffect(() => {
    if (router.query.q) {
      setSearchVal(router.query.q as string);
    }
  }, [router.query.q]);

  return (
    <SearchHeader>
      <Box maxWidth="1280px" width="100%">
        <form
          id={id}
          role="search"
          aria-label={ariaLabel}
          onSubmit={(e: any) => {
            e.preventDefault();

            router.push({
              pathname: `${EVENTS_BASE_PATH}`,
              query: {
                ...(searchVal.length && {
                  q: searchVal,
                }),
              },
            });
          }}
        >
          <Box display="flex" alignItems="end" width="100%" marginBottom="m">
            <TextInput
              width="100%"
              id="event-search-bar-input"
              labelText="Event Search Input"
              value={searchVal as string}
              placeholder="Enter Event Keyword"
              onChange={(e: any) => {
                setSearchVal(e.target.value);
              }}
            />
            <Button id="event-search-button" type="submit" minWidth="100px">
              Submit
            </Button>
          </Box>
          <FilterBar
            id="events-calendar-filter-bar"
            label="Filter By"
            searchQuery={true}
            routerPathname={`${EVENTS_BASE_PATH}`}
            groups={[
              {
                id: "location",
                label: "Locations",
                type: "localist_place",
              },
              {
                id: "event_series",
                label: "Event Series",
                type: "localist_filter",
              },
              {
                id: "event_types",
                label: "Event Types",
                type: "localist_filter",
              },
              {
                id: "event_topics",
                label: "Event Topics",
                type: "localist_filter",
              },
              {
                id: "event_audience",
                label: "Event Audience",
                type: "localist_filter",
              },
            ]}
          />
        </form>
      </Box>
    </SearchHeader>
  );
}
