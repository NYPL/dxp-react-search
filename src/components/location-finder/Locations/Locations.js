import React, { useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { LocationsQuery as LOCATIONS_QUERY } from "./../../../apollo/client/queries/Locations.gql";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "./../../../redux/actions";
// Components
import { Box, Icon, Link } from "@nypl/design-system-react-components";
import Location from "./../Location";
import LocationsSkeletonLoader from "./LocationsSkeletonLoader";
import LocationsPagination from "./LocationsPagination";
// Hooks
import useWindowSize from "./../../../hooks/useWindowSize";
// Utils
import setTermsFilter from "./../../../utils/setTermsFilter";

function Locations() {
  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize < 600) {
    limit = 10;
  }

  // Redux
  const {
    searchQueryGeoLat,
    searchQueryGeoLng,
    searchQuery,
    openNow,
    searchFilters,
    offset,
    pageNumber,
  } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;
  // Convert the searchFilters to the object format needed by gql.
  const termIds = setTermsFilter(searchFilters);

  // Query for data.
  const { loading, error, data } = useQuery(LOCATIONS_QUERY, {
    variables: {
      searchGeoLat,
      searchGeoLng,
      searchQuery,
      openNow,
      termIds,
      limit,
      offset,
      pageNumber,
    },
  });

  // Side effect to dispatch redux action to set pagination redux state.
  useEffect(() => {
    if (data) {
      // Dispatch redux action
      dispatch(
        setPagination({
          pageNumber: pageNumber,
          offset: offset,
          pageCount: Math.ceil(
            data.refineryAllLocations.pageInfo.totalItems / limit
          ),
          resultsCount: data.refineryAllLocations.locations.length,
        })
      );
    }
  }, [data]);

  // Error state.
  if (error) {
    return <div>'error while loading locations'</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <LocationsSkeletonLoader />;
  }

  // No results.
  if (data.refineryAllLocations.locations.length === 0) {
    return (
      <div className="no-results">Try adjusting search terms or filters.</div>
    );
  }

  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "scroll",
        scrollbarWidth: "auto",
        scrollbarColor: "#888 #f8f8f7",
      }}
    >
      <Link
        additionalStyles={{
          display: ["block", "block", "none"],
          marginTop: "xs",
          marginBottom: "m",
        }}
        href="#locations-gmap"
      >
        Skip to Map
        <Icon
          name="arrow"
          align="right"
          iconRotation={IconRotationTypes.Rotate0}
          color={IconColors.UiBlack}
          size="small"
        />
      </Link>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {data.refineryAllLocations.locations.map((location) => (
          <li>
            <Location key={location.id} location={location} />
          </li>
        ))}
      </ul>
      <LocationsPagination limit={limit} />
    </Box>
  );
}

export default Locations;
