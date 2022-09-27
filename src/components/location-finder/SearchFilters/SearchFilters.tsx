import React, { useEffect, useState } from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import { Heading } from "@nypl/design-system-react-components";
import Modal from "../../ds-prototypes/FilterBar/Modal";
import DropdownDesktop from "./DropdownDesktop";
import DropdownMobile from "./DropdownMobile";
import DropdownMobileButtons from "./DropdownMobileButtons";
import FiltersButton from "./FiltersButton";
import DropdownMobileClear from "./DropdownMobileClear";
// Hooks
import useWindowSize from "../../../hooks/useWindowSize";
import usePrevious from "../../../hooks/usePrevious";
// Context
import { SearchFiltersProvider } from "./SearchFiltersContext";

export const FILTERS_QUERY = gql`
  query FiltersQuery {
    refineryAllTerms {
      id
      name
      terms {
        id
        name
        children {
          id
          name
        }
      }
    }
  }
`;

function SearchFilters() {
  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>();

  // Set the isMobile state based on screen width.
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize && windowSize >= 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  // Handle the scroll after modal closes.
  const prevModalState = usePrevious(isModalOpen);
  useEffect(() => {
    if (isMobile && prevModalState !== isModalOpen) {
      // @ts-ignore
      document.getElementById("locations-list").scrollIntoView();
    }
  }, [isModalOpen]);

  // Query for data.
  const { loading, error, data } = useQuery(FILTERS_QUERY, {});

  // Error state.
  if (error) {
    return <div>'error while loading filters'</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div></div>;
  }

  return (
    <SearchFiltersProvider>
      {isMobile ? (
        <div className="search-filters__mobile">
          <FiltersButton setIsModalOpen={setIsModalOpen} />
          {isModalOpen && (
            <Modal>
              <DropdownMobileButtons setIsModalOpen={setIsModalOpen} />
              <Heading
                id="search-filters__mobile-heading"
                level="three"
                text="Filters"
              />
              {data.refineryAllTerms.map((vocab: any) => {
                return <DropdownMobile key={vocab.id} vocab={vocab} />;
              })}
              <DropdownMobileClear />
            </Modal>
          )}
        </div>
      ) : (
        <div className="search-filters">
          <div className="search-filters__group1">
            <Heading
              className="search-filters-group__heading"
              id="search-filters-group1__heading"
              level="three"
              text="Filters"
            />
            <div className="search-filters__dropdowns">
              {data.refineryAllTerms.slice(0, 3).map((vocab: any) => {
                return <DropdownDesktop key={vocab.id} vocab={vocab} />;
              })}
            </div>
          </div>
          <div className="search-filters__group2">
            <Heading
              className="search-filters-group__heading"
              id="search-filters-group2__heading"
              level="three"
              text="Research Filters"
            />
            <div className="search-filters__dropdowns">
              {data.refineryAllTerms.slice(3, 5).map((vocab: any) => {
                return <DropdownDesktop key={vocab.id} vocab={vocab} />;
              })}
            </div>
          </div>
        </div>
      )}
    </SearchFiltersProvider>
  );
}

export default SearchFilters;
