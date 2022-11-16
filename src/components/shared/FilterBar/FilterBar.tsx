import React, { useEffect } from "react";
// Hooks
import usePrevious from "../../../hooks/usePrevious";
// Types
import { FilterBarGroupItem } from "./types";
import {
  SelectedItems,
  FilterBar as DsFilterBar,
  MultiSelectGroup,
  useFilterBar,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components";
// Components
import MultiSelect from "./MultiSelect";
// Next
import { useRouter } from "next/router";

interface FilterBarProps {
  /** The id of the filter bar instance. */
  id: string;
  /** The label of the filter bar instance. */
  label: string;
  /** The groups of the filter bar instance. */
  groups: FilterBarGroupItem[];
  /** The path to use for clear and saving of multiselects. */
  routerPathname: string;
  /** Optional boolean to control the q parameter, used for text search. */
  searchQuery?: boolean;
}

function FilterBar({
  id,
  label,
  groups,
  routerPathname,
  searchQuery,
}: FilterBarProps) {
  // Next router
  const router = useRouter();
  const { isLargerThanMobile } = useNYPLBreakpoints();

  const {
    selectedItems,
    setSelectedItems,
    onChange,
    onClear,
    onClearAll,
    isModalOpen,
    onToggle,
  } = useFilterBar();

  // Handle the scroll after modal closes.
  // @TODO fix this, only works on search pg, div not on main pg!
  const prevModalState = usePrevious(isModalOpen);
  useEffect(() => {
    if (!isLargerThanMobile && prevModalState !== isModalOpen) {
      // @ts-ignore
      document
        .getElementById("page-container--content-primary")
        .scrollIntoView();
    }
  }, [isModalOpen]);

  // Sync the selectedItems with the url state if the "clear all search terms" function in SearchResultsDetails.js is called.
  useEffect(() => {
    if (
      Object.keys(router.query).length > 0 &&
      Object.keys(selectedItems).length === 0
    ) {
      let urlState = {};
      for (let [groupId] of Object.entries(router.query)) {
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
    }
    if (
      Object.keys(router.query).length === 0 &&
      Object.keys(selectedItems).length > 0
    ) {
      onClearAll();
    }
  }, [router.query]);

  function handleChange(itemId: string, groupId: string) {
    itemId = itemId.replace(/^[^__]*__/, "");
    // @TODO Hack to allow only one selection for Availability
    if (groupId === "availability") {
      setSelectedItems({ ...selectedItems, [groupId]: { items: [itemId] } });
    } else {
      onChange(itemId, groupId);
    }
  }

  function handleApply(selectedItems: SelectedItems) {
    // Get the query params to add using the groups.
    let queryParamsToAdd = {};
    groups.map((group: FilterBarGroupItem) => {
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
          ...(searchQuery && {
            q: router.query.q,
          }),
          ...queryParamsToAdd,
          page: 1,
        },
      })
      .then(() => {
        onToggle(false);
      });
  }

  function onClearAllMultiSelects() {
    onClearAll();
    // Remove the selectedItems from url state.
    router.push({
      pathname: routerPathname,
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

  function handleClear(groupId: string) {
    onClear(groupId);
    // Run through query param state and remove
    let queryStateToKeep = {} as any;
    for (let [key] of Object.entries(router.query)) {
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

  return (
    <DsFilterBar
      id={id}
      layout="row"
      isOpen={isModalOpen}
      onToggle={onToggle}
      selectedItems={selectedItems}
      onClear={onClearAllMultiSelects}
      onSubmit={() => handleApply(selectedItems)}
      showClearAll={false}
      showSubmitAll={false}
      headingText={label}
    >
      <MultiSelectGroup
        key="multiSelectGroup-key"
        id="multiSelectGroup"
        labelText="label"
        showLabel={false}
        gap="s"
      >
        {groups.map((group: FilterBarGroupItem) => {
          return (
            <MultiSelect
              key={group.id}
              id={group.id}
              type={group.type}
              limiter={group.limiter}
              label={group.label}
              onChange={(e) => handleChange(e.currentTarget.id, group.id)}
              selectedItems={selectedItems}
              onClear={() => handleClear(group.id)}
              onApply={() => handleApply(selectedItems)}
              includeChildren={group.includeChildren}
              customData={group.customData}
            />
          );
        })}
      </MultiSelectGroup>
    </DsFilterBar>
  );
}

export default FilterBar;
