import React from "react";
import { Heading, Link } from "@nypl/design-system-react-components";
import NextDsLink from "./../../shared/Link/NextDsLink";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";

function OnlineResourceCardHeading(props) {
  const {
    id,
    name,
    accessibleFrom,
    accessLocations,
    resourceUrl,
    slug,
    allLocationMatches,
    authenticationType,
  } = props;

  function linkAccessCheck() {
    let locationMatchesArray = [];
    allLocationMatches?.items.map((locationMatch) => {
      locationMatchesArray.push(locationMatch.locationId);
    });

    let accessLocationsArray = [];
    accessLocations?.map((accessLocation) => {
      accessLocationsArray.push(accessLocation.id);
    });

    const linkAccess = locationMatchesArray.filter((e) =>
      accessLocationsArray.includes(e)
    );
    return linkAccess.length;
  }

  if (linkAccessCheck() || accessibleFrom?.includes("offsite")) {
    if (authenticationType === "nypl") {
      return (
        <Heading id={id} level="three">
          <NextDsLink href={`${ONLINE_RESOURCES_BASE_PATH}/verify?uuid=${id}`}>
            {name}
          </NextDsLink>
        </Heading>
      );
    }
    if (resourceUrl) {
      return (
        <Heading id={id} level="three">
          <Link href={resourceUrl}>{name}</Link>
        </Heading>
      );
    } else {
      return (
        <Heading id={id} level="three">
          <NextDsLink href={slug}>{name}</NextDsLink>
        </Heading>
      );
    }
  } else {
    return (
      <Heading id={id} level="three">
        {name}
      </Heading>
    );
  }
}

export default OnlineResourceCardHeading;
