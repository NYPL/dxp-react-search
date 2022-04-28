import React, { useEffect, useState } from "react";
// Components
import {
  Box,
  Button,
  ButtonTypes,
  Icon,
  IconAlign,
  IconNames,
  IconSizes,
  TextInput,
} from "@nypl/design-system-react-components";
import AutoSuggest from "../../ds-prototypes/AutoSuggest";
import EventCollectionFilters from "./EventCollectionFilters";
import { useRouter } from "next/router";

function EventCollectionSearchForm() {
  const [search, setSearch] = useState("");
  const routerPathname = "/events/all";
  // Next router
  const router = useRouter();

  // Sync the router state to the search form state.
  useEffect(() => {
    if (router.query.q) {
      setSearch(router.query.q as string);
    }
  }, [router.query.q]);

  function handleSubmit(event: any) {
    event.preventDefault();

    // Push form state into url.
    router.push({
      pathname: routerPathname,
      query: {
        q: search,
        page: 1,
        ...(router.query.audience && {
          audience: router.query.audience,
        }),
        ...(router.query["event-type"] && {
          "event-type": router.query["event-type"],
        }),
      },
    });
  }

  const items = [
    "Neptunium",
    "Plutonium",
    "Americium",
    "Curium",
    "Berkelium",
    "Californium",
    "Einsteinium",
    "Fermium",
    "Mendelevium",
    "Nobelium",
    "Lawrencium",
    "Rutherfordium",
    "Dubnium",
    "Seaborgium",
    "Bohrium",
    "Hassium",
    "Meitnerium",
    "Darmstadtium",
    "Roentgenium",
    "Copernicium",
    "Nihonium",
    "Flerovium",
    "Moscovium",
    "Livermorium",
    "Tennessine",
    "Oganesson",
  ];

  const [inputItems, setInputItems] = useState(items);

  function handleChange({ inputValue }: any) {
    setInputItems(
      items.filter((item) => item.toLowerCase().indexOf(inputValue) >= 0)
    );
  }

  function handleSelectedItemChange({ selectedItem }: any) {
    setSearch(selectedItem);
  }

  return (
    <form id="event-collection__form" onSubmit={handleSubmit}>
      <Box display="flex" maxWidth="760px">
        <AutoSuggest
          id="events-search-bar"
          labelText="Enter a search term."
          items={inputItems}
          onChange={handleChange}
          placeholder={"Enter a search term"}
          suggestionsToShow={5}
          selectedItem={search}
          handleSelectedItemChange={handleSelectedItemChange}
        />
        {/* <TextInput
          id="events-search-bar"
          labelText="Search events by key word."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          showOptReqLabel={false}
          additionalStyles={{
            width: "100%",
          }}
        /> */}
        <Button
          id="events-search-button"
          buttonType={ButtonTypes.Primary}
          mouseDown={false}
          type="submit"
          additionalStyles={{
            alignSelf: "flex-end",
          }}
        >
          <Icon
            align={IconAlign.Left}
            name={IconNames.Search}
            size={IconSizes.Medium}
          />
          Search
        </Button>
      </Box>
      <EventCollectionFilters />
    </form>
  );
}

export default EventCollectionSearchForm;
