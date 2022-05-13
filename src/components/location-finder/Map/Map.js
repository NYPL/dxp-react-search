import React from "react";
import { Box, Icon, Link } from "@nypl/design-system-react-components";
// Google map
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { compose } from "recompose";
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setMapInfoWindow } from "./../../../redux/actions";
// Apollo
import { useQuery } from "@apollo/client";
import { LOCATIONS_QUERY } from "./../Locations/Locations";
// Hooks
import useWindowSize from "./../../../hooks/useWindowSize";
// Utils
import setTermsFilter from "./../../../utils/setTermsFilter";

const MapWrapper = compose(
  withScriptjs,
  withGoogleMap
  // @ts-ignore
)((props) => {
  // Redux
  const {
    searchQueryGeoLat,
    searchQueryGeoLng,
    searchQuery,
    openNow,
    offset,
    pageNumber,
    searchFilters,
    // @ts-ignore
  } = useSelector((state) => state.search);
  const { mapCenter, mapZoom, infoWindowId, infoWindowIsVisible } = useSelector(
    // @ts-ignore
    (state) => state.map
  );

  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize && windowSize < 600) {
    limit = 10;
  }

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
    return <div>Loading</div>;
  }

  if (error) {
    return <div>'error while loading locations'</div>;
  }

  // Locations that use a parent library will have the same geo-cordinates as parent library.
  // This causes all the map pins to be in the same point, and the last location in the array
  // is visible by default. So we move all parent libraries to end of the locations array so
  // they are visible on default render of the map.
  // @TODO Need to fix this when actual types are added for the location data.
  let keep = [];
  let move = [];
  const slugs = ["schwarzman", "snfl", "schomburg", "lpa"];
  data.refineryAllLocations.locations.forEach((item) => {
    if (!slugs.includes(item.slug)) {
      keep.push(item);
    } else {
      move.push(item);
    }
  });
  const locations = [...keep, ...move];

  return (
    <GoogleMap
      defaultOptions={{ mapTypeControl: false }}
      zoom={mapZoom}
      center={mapCenter}
    >
      {searchQueryGeoLat && searchQueryGeoLng && (
        <Marker
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            // @ts-ignore
            scaledSize: new google.maps.Size(32, 32),
          }}
          position={{
            lat: searchQueryGeoLat,
            lng: searchQueryGeoLng,
          }}
        />
      )}
      {locations.map((location) => {
        // Binds onClick from Map prop
        // @ts-ignore
        const onClick = props.onClick.bind(this, location);

        return (
          <Marker
            key={location.id}
            onClick={onClick}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              // @ts-ignore
              scaledSize: new google.maps.Size(32, 32),
            }}
            position={{
              lat: location.geoLocation.lat,
              lng: location.geoLocation.lng,
            }}
          >
            {infoWindowIsVisible && infoWindowId === location.id && (
              <InfoWindow>
                <div>
                  <div>
                    <Link href={location.url}>{location.name}</Link>
                  </div>
                  <div>{location.address_line1}</div>
                  <div>
                    {location.locality}, {location.administrative_area},{" "}
                    {location.postal_code}
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

function Map() {
  // Redux
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  function handleClick(location) {
    dispatch(
      setMapInfoWindow({
        // @ts-ignore
        infoWindowId: location.id,
        infoWindowIsVisible: true,
      })
    );

    // Scroll to location on list when map marker is clicked for desktop only.
    if (windowSize && windowSize >= 600) {
      // Set focus
      // @ts-ignore
      document.querySelector(`#lid-${location.id} a`).focus();
      // Scroll into view.
      // @ts-ignore
      document.getElementById(`lid-${location.id}`).scrollIntoView({
        // @ts-ignore
        alignToTop: false,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <Box
        display={["block", "block", "none"]}
        paddingBottom="xs"
        className="locations__map-help-msg"
      >
        Use two fingers to pan the map.
      </Box>
      <MapWrapper
        aria-hidden="true"
        // @ts-ignore
        onClick={handleClick}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${NEXT_PUBLIC_GOOGLE_MAPS_API}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <Link
        // additionalStyles
        sx={{ display: ["block", "block", "none"] }}
        href="#locations-list"
      >
        Back to List
        <Icon
          name="arrow"
          align="right"
          iconRotation="rotate180"
          color="ui.black"
          size="small"
        />
      </Link>
    </>
  );
}

export default Map;
