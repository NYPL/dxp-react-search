import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import { 
  Button, 
  Heading,
  Icon,
  Modal, 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import MultiSelect from './MultiSelect';
// Hooks
import useWindowSize from '../../../hooks/useWindowSize';
import usePrevious from '../../../hooks/usePrevious';
// Config
import { ONLINE_RESOURCES_BASE_PATH } from './../../../utils/config';
// Styles
import s from './SearchFilters.module.css';

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
  
  // @TODO not used anymore.
  // Set default values on intial render only, i.e, page load with query params.
  // This works b/c passing [] as second arg, magically does this w/ hooks. :/
  /*useEffect(() => {
    if (Object.keys(selectedItems).length === 0) {
      console.log('reset state to match query params')
      let defaultItems = {};
      groups.forEach(group => {
        if (router.query[group.id]) {
          defaultItems[group.id] = {
            items: router.query[group.id].split(' ')
          }
        }
      });
      setSelectedItems(defaultItems);
    } 
  }, []);
  */
  
  // Sync the url state with the local react state when query params change.
  useEffect(() => {
    let urlState = {};
    for (let [groupId, value] of Object.entries(router.query)) {
      urlState = {
        ...urlState,
        [groupId]: {
          items: router.query[groupId].split(' ')
        }
      }
    }
    setSelectedItems(urlState);
  }, [router.query]);
  
  // @TODO Need to move this state to redux, so SearchResultsDetails can clear
  // the state in onClearSearchTerms().
  function onSelectedItemChange(event, groupId) {
    const itemId = event.target.id;

    const nextState = (object, property) => {
      let {[property]: omit, ...rest} = object
      return rest;
    }

    let itemIds;
    // Check if the tid already exists in the state
    if (selectedItems[groupId] !== undefined) {
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

  function onSaveMultiSelect() {
    // Update url params
    router.push({
      pathname: `${ONLINE_RESOURCES_BASE_PATH}/search`,
      query: { 
        /*...(router.query.q && {
          q: router.query.q
        }),
        ...(router.query.page && {
          page: router.query.page
        }),
        */
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

  function onClearMultiSelect(groupId) {
    setIsModalOpen(false);

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

    setSelectedItems({})
    // Reset any open multiselect menus.
    setSelectedGroupIds([])
  }

  function onClick() {
    setIsModalOpen(true)
  }

  function onMenuClick(groupId) {
    //const savedItems = action.payload.savedItems;
    //const vocabId = action.payload.vocabId;
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

  return (
    <div>
      {isMobile ? (
        <div className={s.mobileContainer}>
          <Button 
            id='search-filters__mobile-filters-button'
            className={s.filterBarButtonMobile}
            onClick={() => onClick()}
            buttonType='outline'
            type='button'
          >
            Filters
          </Button>
          {/*<button
            id='search-filters__mobile-filters-button'
            type="button"
            onClick={() => onClick()}
            className={`button button--outline ${s.filterBarButtonMobile}`}
          >
            Filters
          </button>
          */}
          {isModalOpen && (
            <Modal>
              <div className={s.ctaButtonsContainerMobile}>
                <Button
                  buttonType="link"
                  className={s.ctaClearButtonMobile}
                  id={'multiselect-button-clear'}
                  mouseDown={false}
                  type="button"
                  onClick={(e) => onClearMultiSelect(e)}
                >
                  <Icon
                    decorative
                    iconRotation="rotate-90"
                    modifiers={[
                      'small'
                    ]}
                    name="arrow"
                  />
                  Go Back
                </Button>
                <Button
                  buttonType="filled"
                  id={`multiselect-button-save`}
                  mouseDown={false}
                  type="button"
                  onClick={(e) => onSaveMultiSelect(e)}
                >
                  Show Results
                </Button>
              </div>
              <div className={s.multiSelectsContainerMobile}>
                <Heading
                  id="search-filters__mobile-heading"
                  level={3}
                  text="Filters"
                />
                {groups.map(group => {
                  return (
                    <MultiSelect
                      id={group.id}
                      limiter={group.limiter}
                      label={group.label}
                      onSelectedItemChange={(e) => onSelectedItemChange(e, group.id)}
                      selectedItems={selectedItems}
                      onClearMultiSelect={() => onClearMultiSelect(group.id)}    
                      onSaveMultiSelect={onSaveMultiSelect}
                      onMenuClick={() => onMenuClick(group.id)}
                      selectedGroupIds={selectedGroupIds}
                      showCtaButtons={false}
                    />
                  )
                })}
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <div className={s.desktopContainer}>
          <Heading
            id="search-filters--heading"
            level={3}
            text="Filter By"
          />
          <div className={s.multiSelectsContainerDesktop}>
            {groups.map(group => {
              return (
                <MultiSelect
                  id={group.id}
                  limiter={group.limiter}
                  label={group.label}
                  onSelectedItemChange={(e) => onSelectedItemChange(e, group.id)}
                  selectedItems={selectedItems}
                  onClearMultiSelect={() => onClearMultiSelect(group.id)}    
                  onSaveMultiSelect={onSaveMultiSelect}
                  onMenuClick={() => onMenuClick(group.id)}
                  selectedGroupIds={selectedGroupIds}
                  showCtaButtons={true}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;