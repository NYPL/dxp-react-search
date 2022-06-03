import * as React from "react";
// Hooks
//import useWindowSize from "../../../hooks/useWindowSize";
//import usePrevious from "../../../hooks/usePrevious";
import useFilterBar from "./../../ds-prototypes/FilterBar/useFilterBar";
// Types
import { FilterBarGroupItem } from "./types";
//import { SelectedItems } from "@nypl/design-system-react-components";
// Components
import { default as DsFilterBar } from "./../../ds-prototypes/FilterBar/FilterBar";
import MultiSelect from "./MultiSelect";
import { MultiSelectItem } from "@nypl/design-system-react-components";
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

export default function FilterBar({
  id,
  label,
  groups,
  routerPathname,
  searchQuery,
}: FilterBarProps) {
  const {
    isOpen,
    onOpen,
    onClose,
    onChange,
    onMixedStateChange,
    //onClear,
    selectedItems,
    setSelectedItems,
  } = useFilterBar();

  // MultiSelect state
  //const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  // Next router
  const router = useRouter();

  // Handle the scroll after modal closes.
  // @TODO fix this, only works on search pg, div not on main pg!
  //const prevModalState = usePrevious(isOpen);
  // React.useEffect(() => {
  //   if (prevModalState !== isOpen) {
  //     // @ts-ignore
  //     document
  //       .getElementById("page-container--content-primary")
  //       .scrollIntoView();
  //   }
  // }, [isOpen]);

  // Sync the url state with the local react state when query params change.
  React.useEffect(() => {
    let urlState = {};
    let shouldScroll = false;
    for (let [groupId] of Object.entries(router.query)) {
      if (groupId !== "page" && groupId !== "q") {
        urlState = {
          ...urlState,
          [groupId]: {
            items: (router.query[groupId] as string).split(" "),
          },
        };
        shouldScroll = true;
      }
    }
    setSelectedItems(urlState);

    // Scroll
    const scrollToElement = document.getElementById(
      // @TODO Change this to be an id prop passed
      // called scrollToId or something.
      "page-container--content-primary"
    );
    if (scrollToElement && shouldScroll) {
      scrollToElement.scrollIntoView();
    }
  }, [router.query, isOpen]);

  // function handleChange(itemId: string, groupId: string) {
  //   itemId = itemId.replace(/^[^__]*__/, "");

  //   let itemIds;
  //   // Check if the tid already exists in the state
  //   if (
  //     selectedItems[groupId] !== undefined &&
  //     // @TODO Temporary hack to make availability multiselect use radios.
  //     groupId !== "availability"
  //   ) {
  //     let itemIdExists = selectedItems[groupId].items.indexOf(itemId) > -1;
  //     // Make a copy of the existing array.
  //     itemIds = selectedItems[groupId].items.slice();
  //     // If termId exists, remove it from the array.
  //     if (itemIdExists) {
  //       itemIds = itemIds.filter((id) => id != itemId);
  //     } else {
  //       // Add it to the array, but modify the copy, not the original.
  //       itemIds.push(itemId);
  //     }
  //   } else {
  //     itemIds = [];
  //     itemIds.push(itemId);
  //   }
  //   setSelectedItems({
  //     ...selectedItems,
  //     [groupId]: {
  //       items: itemIds,
  //     },
  //   });
  // }

  function handleApply() {
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
        // Close FilterBar.
        onClose();
      });
  }

  function handleClearAll() {
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
      label={label}
      selectedItems={selectedItems}
      isOpen={isOpen}
      onToggle={onOpen}
      onClose={onClose}
      onClear={handleClearAll}
      onApply={handleApply}
    >
      {groups.map((group: FilterBarGroupItem) => {
        return (
          <MultiSelect
            key={group.id}
            id={group.id}
            selectedItems={selectedItems}
            onChange={(e) => onChange(e.currentTarget.id, group.id)}
            onMixedStateChange={(
              multiSelectId: string,
              parentId: string,
              items: MultiSelectItem[]
            ) => {
              onMixedStateChange(multiSelectId, parentId, items);
            }}
            onClear={() => handleClear(group.id)}
            onApply={handleApply}
            type={group.type}
            limiter={group.limiter}
            label={group.label}
            includeChildren={group.includeChildren}
            customData={group.customData}
          />
        );
      })}
    </DsFilterBar>
  );
}
