import React from "react";
import { Heading, Link } from "@nypl/design-system-react-components";
import NextDsLink from "../../shared/Link/NextDsLink";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "../../../utils/config";

function OnlineResourceCardHeading(props: any) {
  const {
    id,
    name,
    accessibleFrom,
    accessLocations,
    resourceUrl,
    resourceUrls,
    slug,
    allLocationMatches,
    authenticationType,
  } = props;

  function isUserOnSite() {
    const locationMatchesArray: string[] = [];
    allLocationMatches?.items.map((locationMatch: any) => {
      locationMatchesArray.push(locationMatch.locationId);
    });

    const accessLocationsArray: string[] = [];
    accessLocations?.map((accessLocation: any) => {
      accessLocationsArray.push(accessLocation.id);
    });

    const linkAccess = locationMatchesArray.filter((e) =>
      accessLocationsArray.includes(e)
    );
    return linkAccess.length;
  }

  function getResourceUrl(resourceUrls: any) {
    // console.log(resourceUrls);
    let resourceUrl = resourceUrls.main;

    // Onsite
    if (isUserOnSite() && resourceUrls.onsite !== null) {
      resourceUrl = resourceUrls.onsite;
    } else if (resourceUrls.offsite !== null) {
      resourceUrl = resourceUrls.offsite;
    }

    return resourceUrl;
  }

  const test = getResourceUrl(resourceUrls);
  console.log(test);

  // User is onsite OR the resource is accessible from "offsite", display as a link.
  if (isUserOnSite() || accessibleFrom?.includes("offsite")) {
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
          <Link href={test}>{name}</Link>
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
