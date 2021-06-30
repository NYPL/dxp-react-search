import React, { useEffect, useState } from 'react';

// Components
import { 
  Button, 
  Heading, 
  Modal, 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import MultiSelect from './../../ds-prototypes/MultiSelect/MultiSelect';


// Hooks
import useWindowSize from '../../../hooks/useWindowSize';
import usePrevious from '../../../hooks/usePrevious';

const groups = [
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
        /*children: [
          {
            id: 'jersey_city',
            name: 'Jersey City'
          },
          {
            id: 'trenton',
            name: 'Trenton'
          }
        ]
        */
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

function SearchFilters() {
  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState();
  // MultiSelect state
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
  
  // Handle the scroll after modal closes.
  /*const prevModalState = usePrevious(isModalOpen);
  useEffect(() => {
    if (isMobile && prevModalState !== isModalOpen) {
      document.getElementById('locations-list').scrollIntoView();
    } 
  }, [isModalOpen]);
  */

  function onSelectedItemChange(selectedItem, groupId) {
    console.log('selectedItem')
    console.log(selectedItem)
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
    
    //console.log('ITEM IDS!')
    //console.log(itemIds)

    setSelectedItems({
      ...selectedItems,
      [groupId]: {
        items: itemIds
      }
    });
  }

  function onSaveMultiSelects() {
    console.log('onSaveMultiSelects')
    console.log(selectedItems)
    setIsModalOpen(false)
  }

  function onClearMultiSelects(e) {
    console.log('onClearMultiSelects')
    setSelectedItems({})
    setIsModalOpen(false)
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
                    items={group.items}
                    handleOnSelectedItemChange={onSelectedItemChange}
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
                  items={group.items}
                  handleOnSelectedItemChange={onSelectedItemChange}
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