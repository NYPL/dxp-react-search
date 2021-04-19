import React, { useEffect, useState } from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { FiltersQuery as FILTERS_QUERY } from './SearchFilters.gql';
// Components
import { 
  Button, 
  Heading, 
  Modal, 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import DropdownDesktop from './DropdownDesktop';
import DropdownMobile from './DropdownMobile';
import DropdownMobileButtons from './DropdownMobileButtons';
import FiltersButton from './FiltersButton';
import DropdownMobileClear from './DropdownMobileClear';
// Hooks
import useWindowSize from '../../../hooks/useWindowSize';
import usePrevious from '../../../hooks/usePrevious';
// Context
import { 
  SearchFiltersProvider 
} from './SearchFiltersContext';

function SearchFilters() {
  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState();
  
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
  const prevModalState = usePrevious(isModalOpen);
  useEffect(() => {
    if (isMobile && prevModalState !== isModalOpen) {
      document.getElementById('locations-list').scrollIntoView();
    } 
  }, [isModalOpen]);

  // Query for data.
  const { loading, error, data } = useQuery(
    FILTERS_QUERY, {}
  );

  // Error state.
  if (error) {
    return (
      <div>'error while loading filters'</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div></div>
    );
  }

  return (
    <SearchFiltersProvider>
      {isMobile ? (
        <div className='search-filters__mobile'>
          <FiltersButton setIsModalOpen={setIsModalOpen} />
          {isModalOpen && (
            <Modal>
              <DropdownMobileButtons
                setIsModalOpen={setIsModalOpen}
              />
              <Heading
                id="search-filters__mobile-heading"
                level={3}
                text="Filters"
              />
              {data.allTerms.map((vocab) => {
                return (
                  <DropdownMobile key={vocab.id} vocab={vocab} />
                )
              })}
              <DropdownMobileClear />
            </Modal>
          )}
        </div>
      ) : (
        <div className='search-filters'>
          <div className='search-filters__group1'>
            <Heading
              className="search-filters-group__heading"
              id="search-filters-group1__heading"
              level={3}
              text="Filters"
            />
            <div className='search-filters__dropdowns'>
              {data.allTerms.slice(0, 3).map((vocab) => {
                return (
                  <DropdownDesktop key={vocab.id} vocab={vocab} />
                )
              })}
            </div>
          </div>
          <div className='search-filters__group2'>
            <Heading
              className="search-filters-group__heading"
              id="search-filters-group2__heading"
              level={3}
              text="Research Filters"
            />
            <div className='search-filters__dropdowns'>
              {data.allTerms.slice(3, 5).map((vocab) => {
                return (
                  <DropdownDesktop key={vocab.id} vocab={vocab} />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </SearchFiltersProvider>
  );
};

export default SearchFilters;
