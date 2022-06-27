import React from "react";
import { Box, Link } from "@nypl/design-system-react-components";
// Google map
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
// Redux
import { useSelector } from "react-redux";
// Apollo
import { useQuery } from "@apollo/client";
import { LOCATIONS_QUERY } from "../Locations/Locations";
// Hooks
import useWindowSize from "../../../hooks/useWindowSize";
// Utils
import setTermsFilter from "../../../utils/setTermsFilter";
// Type
import { LocationProps as Location } from "../Location/Location";

interface LocationsMapContainerProps {
  onClick: (location: Location) => void;
  // @TODO look deepr into these element props
  loadingElement: React.ReactNode;
  containerElement: React.ReactNode;
  mapElement: React.ReactNode;
}

const LocationsMapContainer = (props: LocationsMapContainerProps) => {
  // Ensure google maps aip key type
  if (NEXT_PUBLIC_GOOGLE_MAPS_API === undefined) {
    throw new Error(
      "NEXT_PUBLIC_GOOGLE_MAPS_API environment variable is not set"
    );
  }
  // Redux
  // @TODO state of redux needs proper types
  const {
    searchQueryGeoLat,
    searchQueryGeoLng,
    searchQuery,
    openNow,
    offset,
    pageNumber,
    searchFilters,
  } = useSelector((state: any) => state.search);
  const { mapCenter, mapZoom, infoWindowId, infoWindowIsVisible } = useSelector(
    (state: any) => state.map
  );

  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize && windowSize < 600) {
    limit = 10;
  }

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;

  // Convert the searchFilters to the object format needed by gql.
  const termIds = setTermsFilter(searchFilters);

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
  if (loading || !data) {
    return (
      <Box h="100%" bg="green">
        Loading
      </Box>
    );
  }

  if (error) {
    return <Box>'error while loading locations'</Box>;
  }

  // Locations that use a parent library will have the same geo-cordinates as parent library.
  // This causes all the map pins to be in the same point, and the last location in the array
  // is visible by default. So we move all parent libraries to end of the locations array so
  // they are visible on default render of the map.
  // @TODO Need to fix this when actual types are added for the location data.
  let keep: Location[] = [];
  let move: Location[] = [];
  const slugs = ["schwarzman", "snfl", "schomburg", "lpa"];
  data.refineryAllLocations.locations.forEach((item: Location) => {
    if (!slugs.includes(item.slug)) {
      keep.push(item);
    } else {
      move.push(item);
    }
  });
  const locations = [...keep, ...move];

  return (
    <LoadScript
      googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API}
      loadingElement={props.loadingElement}
    >
      <GoogleMap
        options={{ mapTypeControl: false }}
        mapContainerStyle={containerStyle}
        zoom={mapZoom}
        center={mapCenter}
      >
        {searchQueryGeoLat && searchQueryGeoLng && (
          <Marker
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
            position={{
              lat: searchQueryGeoLat,
              lng: searchQueryGeoLng,
            }}
          />
        )}
        {locations.map((location: Location) => {
          // Binds onClick from Map prop
          const onClick = props.onClick.bind(this, location);
          const position = {
            lat: location.geoLocation.lat,
            lng: location.geoLocation.lng,
          };

          return (
            <Marker
              key={location.id}
              onClick={onClick}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              position={position}
            >
              {infoWindowIsVisible && infoWindowId === location.id && (
                <InfoWindow position={position}>
                  <Box>
                    <Box>
                      <Link href={location.url}>{location.name}</Link>
                    </Box>
                    <Box>{location.address_line1}</Box>
                    <Box>
                      {location.locality}, {location.administrative_area},{" "}
                      {location.postal_code}
                    </Box>
                  </Box>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationsMapContainer;
