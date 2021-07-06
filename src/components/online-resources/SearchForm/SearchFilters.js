import React, { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import { 
  Button, 
  Heading, 
  Modal, 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import MultiSelect from './MultiSelect';
// Hooks
import useWindowSize from '../../../hooks/useWindowSize';
import usePrevious from '../../../hooks/usePrevious';
// Config
import { ONLINE_RESOURCES_BASE_PATH } from './../../../utils/config';

/*const groups = [
  {
    id: 'subjects',
    label: 'Subjects',
    items: [
      {
        id: '164',
        name: 'New York City History'
      },
      {
        id: '209',
        name: 'U.S. Newspapers'
      },
      {
        id: '174',
        name: 'Photography',
        children: [
          {
            id: 'jersey_city',
            name: 'Jersey City'
          },
          {
            id: 'trenton',
            name: 'Trenton'
          }
        ]
      }
    ]
  },
  {
    id: 'audience',
    label: 'Audience',
    items: [
      {
        id: '216',
        name: 'Adults'
      },
      {
        id: '222',
        name: 'Teens'
      },
    ]
  },
  {
    id: 'availability',
    label: 'Availability',
    items: [
      {
        id: 'no',
        name: 'Not available'
      },
      {
        id: 'yes',
        name: 'Available'
      },
    ]
  }
];
*/

const groups = [
  {
    id: 'subject',
    label: 'Subjects',
  },
  {
    id: 'audience_by_age',
    label: 'Audience',
  }
];

function SearchFilters() {
  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState();
  // MultiSelect state
  // @TODO default should not be empty object!
  const [selectedItems, setSelectedItems] = useState({});
  
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
  const prevModalState = usePrevious(isModalOpen);
  useEffect(() => {
    if (isMobile && prevModalState !== isModalOpen) {
      document.getElementById('search-results__container').scrollIntoView();
    } 
  }, [isModalOpen]);
  
  // Set default values on intial render only, i.e, page load with query params.
  // This works b/c passing [] as second arg, magically does this w/ hooks. :/
  useEffect(() => {
    if (Object.keys(selectedItems).length === 0) {
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

  function onSelectedItemChange(selectedItem, groupId) {
    const itemId = selectedItem.id;

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

  function onSaveMultiSelects() {
    setIsModalOpen(false);

    // Update url params
    router.push({
      pathname: `${ONLINE_RESOURCES_BASE_PATH}/search`,
      query: { 
        ...(router.query.q && {
          q: router.query.q
        }),
        ...(router.query.page && {
          page: router.query.page
        }),
        ...(selectedItems['subject'] && {
          subject: selectedItems['subject'].items.join(' ')
        }),
        ...(selectedItems['audience_by_age'] && {
          audience_by_age: selectedItems['audience_by_age'].items.join(' ')
        }),
      }
    });
  }

  function onClearMultiSelects(e) {
    setIsModalOpen(false)

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
        })
      }
    });

    setSelectedItems({})
  }

  function onClick() {
    setIsModalOpen(true)
  }

  return (
    <div>
      {isMobile ? (
        <div>
          <Button 
            id='search-filters__mobile-filters-button' 
            onClick={() => onClick()}
            buttonType='outline'
          >
            Filters
          </Button>
          {isModalOpen && (
            <Modal>
              <div>
                <Button
                  buttonType="link"
                  id={'multi-select-button-clear'}
                  mouseDown={false}
                  type="button"
                  onClick={(e) => onClearMultiSelects(e)}
                >
                  Clear
                </Button>
                <Button
                  buttonType="filled"
                  id={`multi-select-button-save`}
                  mouseDown={false}
                  type="button"
                  onClick={(e) => onSaveMultiSelects(e)}
                >
                  Apply Filters
                </Button>
              </div>
              <Heading
                id="search-filters__mobile-heading"
                level={3}
                text="Filters"
              />
              {groups.map(group => {
                return (
                  <MultiSelect
                    id={group.id}
                    label={group.label}
                    onSelectedItemChange={onSelectedItemChange}
                    selectedItems={selectedItems}      
                  />
                )
              })}
            </Modal>
          )}
        </div>
      ) : (
        <div>
          <Heading
            id="search-filters--heading"
            level={3}
            text="Filter By"
          />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em 0'
          }}>
            {groups.map(group => {
              return (
                <MultiSelect
                  id={group.id}
                  label={group.label}
                  onSelectedItemChange={onSelectedItemChange}
                  selectedItems={selectedItems}      
                />
              )
            })}
            <Button
              buttonType="link"
              id={'multi-select-button-clear'}
              mouseDown={false}
              type="button"
              onClick={(e) => onClearMultiSelects(e)}
            >
              Clear
            </Button>
            <Button
              buttonType="filled"
              id={`multi-select-button-save`}
              mouseDown={false}
              type="button"
              onClick={(e) => onSaveMultiSelects(e)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;