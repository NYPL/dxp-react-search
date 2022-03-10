import React from "react";

import {
  Box,
  Button,
  ButtonTypes,
  Heading,
  HeadingDisplaySizes,
  HeadingLevels,
  HStack,
  Link,
} from "@nypl/design-system-react-components";
// Redux
import { useDispatch } from "react-redux";
import { setMapInfoWindow, setMapPosition } from "../../../redux/actions";
// Components
import LocationAccessibility from "./LocationAccessibility";
import LocationHours from "./LocationHours";
import LocationDistance from "./LocationDistance";
// Hooks
import useWindowSize from "../../../hooks/useWindowSize";

interface LocationProps {
  location: any;
}

function Location({ location }: LocationProps) {
  // Redux dispatch
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  // Address formatting.
  const formattedAddress = `${location.address_line1}\n${location.locality}, ${location.administrative_area} ${location.postal_code}`;
  // Get directions link.
  const encodedAddress = encodeURIComponent(formattedAddress);
  const getDirectionsLink =
    "http://maps.google.com/maps?f=q&hl=en&saddr=&daddr=" + encodedAddress;

  function onClickViewOnMap(e: any) {
    e.preventDefault();

    dispatch(
      setMapPosition({
        mapCenter: location.geoLocation,
        mapZoom: 14,
      })
    );

    dispatch(
      setMapInfoWindow({
        infoWindowId: location.id,
        infoWindowIsVisible: true,
      })
    );

    // @ts-ignore
    if (windowSize < 600) {
      // @ts-ignore
      document.getElementById("locations-gmap").scrollIntoView();
    }
  }

  return (
    <Box marginBottom="m">
      <Heading
        id={`lid-${location.id}`}
        level={HeadingLevels.Two}
        displaySize={HeadingDisplaySizes.Tertiary}
      >
        <Link href={location.url}>{location.name}</Link>
      </Heading>
      {location.parentLibraryName && (
        <Box fontStyle="italic" className="location__parent">
          {location.parentLibraryName}
        </Box>
      )}
      <Box mb="xxs" whiteSpace="pre-wrap" className="address">
        {formattedAddress}
      </Box>
      <Box className="phone">{location.phone}</Box>
      <LocationAccessibility
        access={location.wheelchairAccess}
        note={location.accessibilityNote}
      />
      <LocationHours
        open={location.open}
        todayHoursStart={location.todayHours.start}
        todayHoursEnd={location.todayHours.end}
        appointmentOnly={location.appointmentOnly}
      />
      <LocationDistance locationPoint={location.geoLocation} />
      <HStack>
        <Button buttonType={ButtonTypes.Link} onClick={onClickViewOnMap}>
          View on Map
        </Button>
        <Box>|</Box>
        <Link href={getDirectionsLink}>Get Directions</Link>
      </HStack>
    </Box>
  );
}

export default Location;
