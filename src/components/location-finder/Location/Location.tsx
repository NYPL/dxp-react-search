import React from "react";

import {
  Box,
  Button,
  Heading,
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

export interface LocationProps {
  id: string;
  accessibilityNote: string;
  address_line1: string;
  address_line2: string;
  administrative_area: string;
  appointmentOnly: boolean;
  contentType: string;
  geoLocation: GeoLocation;
  locality: string;
  name: string;
  open: boolean;
  parentLibraryName: string | null;
  phone: string;
  postal_code: string;
  slug: string;
  status: string;
  todayHours: TodayHours;
  url: string;
  wheelchairAccess: "full" | "partial" | "none";
}

type GeoLocation = {
  lat: number;
  lng: number;
};

type TodayHours = {
  end: string;
  start: string;
};

function Location({
  id,
  accessibilityNote,
  address_line1,
  administrative_area,
  appointmentOnly,
  geoLocation,
  locality,
  name,
  open,
  parentLibraryName,
  phone,
  postal_code,
  todayHours,
  url,
  wheelchairAccess,
}: LocationProps) {
  // Redux dispatch
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  // Address formatting.
  const formattedAddress = `${address_line1}\n${locality}, ${administrative_area} ${postal_code}`;
  // Get directions link.
  const encodedAddress = encodeURIComponent(formattedAddress);
  const getDirectionsLink =
    "http://maps.google.com/maps?f=q&hl=en&saddr=&daddr=" + encodedAddress;

  function onClickViewOnMap(e: any) {
    e.preventDefault();

    dispatch(
      setMapPosition({
        mapCenter: geoLocation,
        mapZoom: 14,
      })
    );

    dispatch(
      setMapInfoWindow({
        infoWindowId: id,
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
      <Heading id={`lid-${id}`} level="two" size="tertiary">
        <Link href={url}>{name}</Link>
      </Heading>
      {parentLibraryName && (
        <Box fontStyle="italic" className="location__parent">
          {parentLibraryName}
        </Box>
      )}
      <Box mb="xxs" whiteSpace="pre-wrap" className="address">
        {formattedAddress}
      </Box>
      <Box mb="xxs" className="phone">
        {phone}
      </Box>
      <LocationAccessibility
        access={wheelchairAccess}
        note={accessibilityNote}
      />
      <LocationHours
        open={open}
        todayHoursStart={todayHours.start}
        todayHoursEnd={todayHours.end}
        appointmentOnly={appointmentOnly}
      />
      <LocationDistance locationPoint={geoLocation} />
      <HStack>
        <Button
          id={`button-view-on-map-${id}`}
          buttonType="link"
          onClick={onClickViewOnMap}
        >
          View on Map
        </Button>
        <Box>|</Box>
        <Link href={getDirectionsLink}>Get Directions</Link>
      </HStack>
    </Box>
  );
}

export default Location;
