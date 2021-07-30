import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import FilterBar from './../../ds-prototypes/FilterBar/FilterBar';
import MultiSelect from './MultiSelect';
// Hooks
import useWindowSize from '../../../hooks/useWindowSize';
import usePrevious from '../../../hooks/usePrevious';
// Config
import { ONLINE_RESOURCES_BASE_PATH } from '../../../utils/config';

const groups = [
  {
    id: 'subject',
    label: 'Subjects',
    limiter: 'online_resource'
  },
  {
    id: 'audience_by_age',
    label: 'Audience'
  },
  {
    id: 'availability',
    label: 'Availability'
  }
];

function SearchFilters() {
  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState();
  // MultiSelect state
  // @TODO default should not be empty object!
  const [selectedItems, setSelectedItems] = useState({});
  // Menu state
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  
  // Set the isMobile state based on screen width.
  const windowSize = useWindowSize();
  useEffect(() => {
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
      document.getElementById('page-container--content-primary').scrollIntoView();
    } 
  }, [isModalOpen]);
    
  // Sync the url state with the local react state when query params change.
  useEffect(() => {
    let urlState = {};
    for (let [groupId, value] of Object.entries(router.query)) {
      if (groupId !== 'page' && groupId !== 'q') {
        urlState = {
          ...urlState,
          [groupId]: {
            items: router.query[groupId].split(' ')
          }
        }
      }
    }
    setSelectedItems(urlState);
  }, [router.query]);
  
  //
  function onMenuClick(groupId) {
    const mode = 'desktop';
    let selectedGroupIdsCopy;
    
    const nextState = (object, property) => {
      let {[property]: omit, ...rest} = object
      return rest;
    }

    if (selectedGroupIds !== undefined) {
      let groupIdExists = selectedGroupIds.indexOf(groupId) > -1;
      // Make a copy of the existing array.
      selectedGroupIdsCopy = selectedGroupIds.slice();
      // If groupIdExists exists, remove it from the array.
      if (groupIdExists) {
        selectedGroupIdsCopy = selectedGroupIdsCopy.filter((id) => id != groupId);
      } else {
        // Desktop
        if (mode === 'desktop') {
          // Desktop: only allow 1 item in the array.
          selectedGroupIdsCopy = [groupId];
        } else {
          // Mobile: allow multiple items in the array.
          selectedGroupIdsCopy.push(groupId);
        }
      }
    } else {
      // No dropdowns open, so add the checked dropdown to the array.
      selectedGroupIdsCopy = [groupId];
    }

    setSelectedGroupIds(selectedGroupIdsCopy);
  }
  
  //
  function onSelectedItemChange(event, groupId) {
    const itemId = event.target.id;

    const nextState = (object, property) => {
      let {[property]: omit, ...rest} = object
      return rest;
    }

    let itemIds;
    // Check if the tid already exists in the state
    if (
      selectedItems[groupId] !== undefined
      // @TODO Temporary hack to make availability multiselect use radios.
      && groupId !== 'availability'
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
        items: itemIds
      }
    });
  }
  
  //
  function onClearAllMultiSelects() {
    // Remove the selectedItems from url state.
    router.push({
      pathname: `${ONLINE_RESOURCES_BASE_PATH}/search`,
      query: { 
        ...(router.query.q && {
          q: router.query.q
        }),
        ...(router.query.page && {
          page: router.query.page
        })
      }
    });
  }
  
  //
  function onClearMultiSelect(groupId) {
    // Run through query param state and remove
    let queryStateToKeep = {};
    for (let [key, value] of Object.entries(router.query)) {
      if (groupId !== key) {
        queryStateToKeep[key] = router.query[key];
      }
    }
    // Clear url params for multiselects.
    router.push({
      pathname: `${ONLINE_RESOURCES_BASE_PATH}/search`,
      // @TODO find better way to do this that doesn't involve specific
      // query params...
      query: { 
        ...(router.query.q && {
          q: router.query.q
        }),
        ...(router.query.page && {
          page: router.query.page
        }),
        ...queryStateToKeep
      }
    });
    // Reset any open multiselect menus.
    setSelectedGroupIds([])
  }
  
  //
  function onSaveMultiSelect() {
    // Update url params
    router.push({
      pathname: `${ONLINE_RESOURCES_BASE_PATH}/search`,
      query: { 
        q: router.query.q,
        page: router.query.page ? router.query.page : 1,
        ...(selectedItems['subject'] && {
          subject: selectedItems['subject'].items.join(' ')
        }),
        ...(selectedItems['audience_by_age'] && {
          audience_by_age: selectedItems['audience_by_age'].items.join(' ')
        }),
        ...(selectedItems['availability'] && {
          availability: selectedItems['availability'].items.join(' ')
        }),
      }
    }).then(() => {
      setIsModalOpen(false);
      // Reset any open multiselect menus.
      setSelectedGroupIds([])
    });
  }

  //
  function handleChangeMixedStateCheckbox(groupId, childItems) {        
    let newItems;
    // Some selected items for group already exist in state.
    if (selectedItems[groupId] !== undefined) {
      //
      if (childItems.every(childItem => selectedItems[groupId].items.includes(childItem))) {
        newItems = selectedItems[groupId].items
          .filter(stateItem => !childItems.includes(stateItem));
      }
      else {
        // Merge all child items.
        newItems = [
          ...childItems,
          ...selectedItems[groupId].items
        ];
      }
    }
    else {
      newItems = childItems;
    }

    setSelectedItems({
      ...selectedItems,
      [groupId]: {
        items: newItems
      }
    });
  }

  return (
    <FilterBar
      id={'online-resources__search-filters'}
      label={'Filter By'}
      isModalOpen={isModalOpen}
      onClickMobileFiltersButton={() => setIsModalOpen(true)}
      onClickGoBack={() => setIsModalOpen(false)}
      isMobile={isMobile}
      selectedItems={selectedItems}
      onClearSelectedItems={onClearAllMultiSelects}
      onSaveSelectedItems={onSaveMultiSelect}
    >
      {groups.map(group => {
        return (
          <MultiSelect
            key={group.id}
            id={group.id}
            limiter={group.limiter}
            label={group.label}
            onSelectedItemChange={(e) => onSelectedItemChange(e, group.id)}
            selectedItems={selectedItems}
            onClearMultiSelect={() => onClearMultiSelect(group.id)}    
            onSaveMultiSelect={onSaveMultiSelect}
            onMenuClick={() => onMenuClick(group.id)}
            selectedGroupIds={selectedGroupIds}
            showCtaButtons={isMobile ? false : true}
            handleChangeMixedStateCheckbox={(childItems) => {
              handleChangeMixedStateCheckbox(group.id, childItems)
            }}
          />
        )
      })}
    </FilterBar>
  );
};

export default SearchFilters;