import React from "react";
// Component
import { Box, Icon, Link } from "@nypl/design-system-react-components";
import LocationsMapContainer from "./LocationsMapContainer";
// Redux
import { useDispatch } from "react-redux";
import { setMapInfoWindow } from "../../../redux/actions";
// Hooks
import useWindowSize from "../../../hooks/useWindowSize";
// Type
import { LocationProps as Location } from "../Location/Location";

function LocationsMap() {
  // Redux
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  function handleClick(location: Location) {
    dispatch(
      setMapInfoWindow({
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
      document.getElementById(`lid-${location.id}`)?.scrollIntoView({
        behavior: "smooth",
        // corresponds to alingToTop = false
        block: "end",
        inline: "nearest",
      });
    }
  }

  return (
    <>
      <Box display={["block", "block", "none"]} paddingBottom="xs">
        Use two fingers to pan the map.
      </Box>
      <LocationsMapContainer
        aria-hidden="true"
        onClick={handleClick}
        loadingElement={<Box h="100%" bg="red" />}
        containerElement={<Box sx={{ height: `500px` }} />}
        mapElement={<Box sx={{ height: `100%` }} />}
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

export default LocationsMap;
