import React, { useContext } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// @ts-ignore
import { LocationByInternalSlugQuery as LOCATION_BY_INTERNAL_SLUG } from "./../../../apollo/client/queries/LocationByInternalSlug.gql";
// Next
import { useRouter } from "next/router";
// Components
import {
  Heading,
  Icon,
  IconNames,
  IconSizes,
  Link,
  LinkTypes,
} from "@nypl/design-system-react-components";
import { FormContext } from "./../../../context/FormContext";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function RequestVisitConfirmation() {
  const router = useRouter();
  // @ts-ignore
  const [state] = useContext(FormContext);

  let internalSlugArray = [];
  internalSlugArray.push(router.query.id);

  const { loading, error, data } = useQuery(LOCATION_BY_INTERNAL_SLUG, {
    variables: {
      contentType: "library",
      limit: 1,
      pageNumber: 1,
      internalSlug: internalSlugArray,
    },
  });

  const locationName = data?.allLocations?.items[0]?.name;
  const locationUrl = `${NEXT_PUBLIC_NYPL_DOMAIN}${data?.allLocations?.items[0]?.url}`;

  // Error state.
  if (error) {
    return <div>'error while loading locations'</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Heading className="request-visit__header" level={2} text="Thank You!" />
      <p>
        We've recieved your request and will get back to you within 48 hours.
      </p>
      <Link type={LinkTypes.Action} href={locationUrl}>
        Back to {locationName}
        <span style={{ marginLeft: "5px" }}>
          <Icon name={IconNames.headset} size={IconSizes.medium} />
        </span>
      </Link>
    </div>
  );
}

export default RequestVisitConfirmation;
