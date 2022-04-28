import React, { useEffect } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
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

export const LOCATIONS_QUERY = gql`
  query LocationsQuery(
    $searchGeoLat: Float
    $searchGeoLng: Float
    $searchQuery: String
    $openNow: Boolean
    $termIds: [RefineryTermsFilter]
    $limit: Int
    $pageNumber: Int
    $offset: Int
  ) {
    refineryAllLocations(
      limit: $limit
      pageNumber: $pageNumber
      offset: $offset
      filter: { openNow: $openNow, termIds: $termIds }
      sortByDistance: {
        originLat: $searchGeoLat
        originLng: $searchGeoLng
        searchQuery: $searchQuery
      }
    ) {
      locations {
        id
        name
        contentType
        slug
        url
        status
        parentLibraryName
        address_line1
        address_line2
        locality
        administrative_area
        postal_code
        phone
        wheelchairAccess
        accessibilityNote
        geoLocation {
          lat
          lng
        }
        todayHours {
          start
          end
        }
        appointmentOnly
        open
      }
      pageInfo {
        totalItems
        timestamp
      }
    }
  }
`;

function Locations() {
  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize && windowSize < 600) {
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
    // @ts-ignore
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
        // additionalStyles
        sx={{
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
          iconRotation="rotate0"
          color="ui.black"
          size="small"
        />
      </Link>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {data.refineryAllLocations.locations.map((location: any) => (
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
