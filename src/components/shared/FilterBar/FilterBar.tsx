import React, { useEffect, useState } from "react";
// Hooks
import useWindowSize from "../../../hooks/useWindowSize";
import usePrevious from "../../../hooks/usePrevious";
// Types
import { FilterBarGroupItem, SelectedItems, SelectedItemsMap } from "./types";
// Components
import { default as DsFilterBar } from "./../../ds-prototypes/FilterBar/FilterBar";
import MultiSelect from "./MultiSelect";
// Next
import { useRouter } from "next/router";

interface FilterBarProps {
  /** The id of the filter bar instance. */
  id: string;
  label: string;
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
  // Local state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>();
  // MultiSelect state
  // @TODO default should not be empty object!
  const [selectedItems, setSelectedItems] = useState<SelectedItemsMap>({});
  // Menu state
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  // Set the isMobile state based on screen width.
  const windowSize = useWindowSize();
  useEffect(() => {
    // @ts-ignore
    if (windowSize >= 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  // Next router
  const router = useRouter();

  // Handle the scroll after modal closes.
  // @TODO fix this, only works on search pg, div not on main pg!
  const prevModalState = usePrevious(isModalOpen);
  useEffect(() => {
    if (isMobile && prevModalState !== isModalOpen) {
      // @ts-ignore
      document
        .getElementById("page-container--content-primary")
        .scrollIntoView();
    }
  }, [isModalOpen]);

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

  //
  function onSelectedItemChange(itemId: string, groupId: string) {
    itemId = itemId.replace(/^[^__]*__/, "");

    const nextState = (object: SelectedItemsMap, property: string) => {
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

  //
  function onSaveMultiSelect() {
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
        setIsModalOpen(false);
        // Reset any open multiselect menus.
        setSelectedGroupIds([]);
      });
  }

  //
  function onClearAllMultiSelects() {
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
    // Reset any open multiselect menus.
    setSelectedGroupIds([]);
  }

  //
  function handleChangeMixedStateCheckbox(
    groupId: string,
    childItems: string[]
  ) {
    let newItems;
    // Some selected items for group already exist in state.
    if (selectedItems[groupId] !== undefined) {
      //
      if (
        childItems.every((childItem) =>
          selectedItems[groupId].items.includes(childItem)
        )
      ) {
        newItems = selectedItems[groupId].items.filter(
          (stateItem) => !childItems.includes(stateItem)
        );
      } else {
        // Merge all child items.
        newItems = [...childItems, ...selectedItems[groupId].items];
      }
    } else {
      newItems = childItems;
    }

    setSelectedItems({
      ...selectedItems,
      [groupId]: {
        items: newItems,
      },
    });
  }

  return (
    <DsFilterBar
      id={id}
      label={label}
      isModalOpen={isModalOpen}
      onClickMobileFiltersButton={() => setIsModalOpen(true)}
      onClickGoBack={() => setIsModalOpen(false)}
      isMobile={isMobile ? isMobile : false}
      selectedItems={selectedItems}
      onClearSelectedItems={onClearAllMultiSelects}
      onSaveSelectedItems={onSaveMultiSelect}
    >
      {groups.map((group: FilterBarGroupItem) => {
        return (
          <MultiSelect
            key={group.id}
            id={group.id}
            type={group.type}
            limiter={group.limiter}
            label={group.label}
            onSelectedItemChange={(e: React.MouseEvent<HTMLButtonElement>) =>
              onSelectedItemChange(e.currentTarget.id, group.id)
            }
            selectedItems={selectedItems}
            onClearMultiSelect={() => onClearMultiSelect(group.id)}
            onSaveMultiSelect={onSaveMultiSelect}
            selectedGroupIds={selectedGroupIds}
            handleChangeMixedStateCheckbox={(childItems: string[]) => {
              handleChangeMixedStateCheckbox(group.id, childItems);
            }}
            legacy={group.legacy ? true : false}
            includeChildren={group.includeChildren}
          />
        );
      })}
    </DsFilterBar>
  );
}

export default FilterBar;
