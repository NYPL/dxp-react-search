import React, { useEffect, useState } from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import FilterBar from "./../../ds-prototypes/FilterBar/FilterBar";
import MultiSelect from "../../ds-prototypes/MultiSelect/MultiSelect";
import { SelectedItems } from "../../ds-prototypes/MultiSelect/MultiSelect.types";
import { useRouter } from "next/router";

export const EVENT_FILTER_QUERY = gql`
  query EventFilterQuery($resourceType: String) {
    audienceFilters: eventFilterCollection(resourceType: "ages") {
      id
      name
    }
    eventTypeFilters: eventFilterCollection(resourceType: "types") {
      id
      name
    }
  }
`;

const groups = [
  {
    id: "audience",
    label: "Audience",
    resourceType: "audienceFilters",
  },
  {
    id: "event-type",
    label: "Event Type",
    resourceType: "eventTypeFilters",
  },
];

function EventCollectionFilters() {
  const routerPathname = "/events/all";
  // Next router
  const router = useRouter();

  // Local state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // MultiSelect state
  // @TODO default should not be empty object!
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  // Sync the url state with the local react state when query params change.
  useEffect(() => {
    let urlState = {};
    for (let [groupId, value] of Object.entries(router.query)) {
      if (groupId !== "page" && groupId !== "q") {
        urlState = {
          ...urlState,
          [groupId]: {
            items: (router.query[groupId] as string).split(" "),
          },
        };
      }
    }
    setSelectedItems(urlState);
  }, [router.query]);

  const { loading, error, data } = useQuery(EVENT_FILTER_QUERY, {});

  if (error) {
    return <div>Error while loading event filters.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  let dateObject: any = {};
  const onChange = (data: any) => {
    dateObject = data;
    console.log(dateObject);
  };

  function onSelectedItemChange(itemId: string, groupId: string) {
    itemId = itemId.replace(/^[^__]*__/, "");

    const nextState = (object: SelectedItems, property: string) => {
      let { [property]: omit, ...rest } = object;
      return rest;
    };

    let itemIds;
    // Check if the tid already exists in the state
    if (
      selectedItems[groupId] !== undefined &&
      // @TODO Temporary hack to make availability multiselect use radios.
      groupId !== "availability"
    ) {
      let itemIdExists = selectedItems[groupId].items.indexOf(itemId) > -1;
      // Make a copy of the existing array.
      itemIds = selectedItems[groupId].items.slice();
      // If termId exists, remove it from the array.
      if (itemIdExists) {
        itemIds = itemIds.filter((id) => id != itemId);
      } else {
        // Add it to the array, but modify the copy, not the original.
        itemIds.push(itemId);
      }
    } else {
      itemIds = [];
      itemIds.push(itemId);
    }
    setSelectedItems({
      ...selectedItems,
      [groupId]: {
        items: itemIds,
      },
    });
  }

  function onClearMultiSelect(groupId: string) {
    // Run through query param state and remove
    let queryStateToKeep = {} as any;
    for (let [key, value] of Object.entries(router.query)) {
      if (groupId !== key) {
        queryStateToKeep[key] = router.query[key];
      }
    }
    // Clear url params for multiselects.
    router.push({
      pathname: routerPathname,
      // @TODO find better way to do this that doesn't involve specific
      // query params...
      query: {
        ...(router.query.q && {
          q: router.query.q,
        }),
        ...(router.query.page && {
          page: router.query.page,
        }),
        ...queryStateToKeep,
      },
    });
  }

  function onClearAllMultiSelects() {
    // Remove the selectedItems from url state.
    router.push({
      pathname: "/events/all",
      query: {
        ...(router.query.q && {
          q: router.query.q,
        }),
        ...(router.query.page && {
          page: router.query.page,
        }),
      },
    });
  }

  function onSaveMultiSelect() {
    // Get the query params to add using the groups.
    let queryParamsToAdd = {};
    groups.map((group: any) => {
      if (selectedItems[group.id] && selectedItems[group.id].items.length > 0) {
        queryParamsToAdd = {
          ...queryParamsToAdd,
          [group.id]: selectedItems[group.id].items.join(" "),
        };
      }
    });

    // Update url params
    router
      .push({
        pathname: routerPathname,
        query: {
          ...(router.query.q && {
            q: router.query.q,
          }),
          ...queryParamsToAdd,
          page: 1,
        },
      })
      .then(() => {
        setIsModalOpen(false);
      });
  }

  const isMobile = false;

  return (
    <>
      {/* <Box>
        <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
      </Box> */}
      <FilterBar
        id="event-collection-filterbar"
        label="Filter By"
        isModalOpen={isModalOpen}
        onClickMobileFiltersButton={() => setIsModalOpen(true)}
        onClickGoBack={() => setIsModalOpen(false)}
        isMobile={isMobile ? isMobile : false}
        selectedItems={{}}
        onClearSelectedItems={onClearAllMultiSelects}
        onSaveSelectedItems={onSaveMultiSelect}
      >
        {/* <Box maxWidth="500px" padding="2rem 0">
          <DatePicker
            id="date-range"
            dateFormat="yyyy-MM-dd"
            dateType={DatePickerTypes.Full}
            minDate="1/1/2021"
            maxDate="3/1/2023"
            labelText="Select the date range you want to visit NYPL"
            nameFrom="visit-dates-from"
            nameTo="visit-dates-to"
            helperTextFrom="From this date."
            helperTextTo="To this date."
            helperText="Select a valid date range."
            invalidText="There was an error with the date range :("
            showOptReqLabel={false}
            isDateRange
            onChange={onChange}
          />
        </Box> */}
        {groups.map((group: any) => (
          <MultiSelect
            id={group.id}
            label={group.label}
            items={data[group.resourceType]}
            selectedItems={selectedItems}
            handleOnSelectedItemChange={(e: any) => {
              console.log(e.currentTarget.name);
              onSelectedItemChange(e.currentTarget.id, group.id);
            }}
            onClearMultiSelect={() => onClearMultiSelect(group.id)}
            onSaveMultiSelect={onSaveMultiSelect}
          />
        ))}
      </FilterBar>
    </>
  );
}

export default EventCollectionFilters;
