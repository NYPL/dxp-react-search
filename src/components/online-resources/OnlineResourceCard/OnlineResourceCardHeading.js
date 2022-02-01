import React from "react";
import {
  Heading,
  HeadingLevels,
  Link,
} from "@nypl/design-system-react-components";
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
        <Heading id={id} level={HeadingLevels.Three}>
          <NextDsLink href={`${ONLINE_RESOURCES_BASE_PATH}/verify?uuid=${id}`}>
            {name}
          </NextDsLink>
        </Heading>
      );
    }
    if (resourceUrl) {
      return (
        <Heading id={id} level={HeadingLevels.Three}>
          <Link
            href={resourceUrl}
            additionalStyles={{
              // ui.link.primary
              color: "#0576D3 !important",
              textDecoration: "underline",
              _hover: {
                // ui.link.secondary
                color: "#004B98 !important",
              },
            }}
          >
            {name}
          </Link>
        </Heading>
      );
    } else {
      return (
        <Heading id={id} level={HeadingLevels.Three}>
          <NextDsLink href={slug}>{name}</NextDsLink>
        </Heading>
      );
    }
  } else {
    return (
      <Heading id={id} level={HeadingLevels.Three}>
        {name}
      </Heading>
    );
  }
}

export default OnlineResourceCardHeading;
