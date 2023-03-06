import * as React from "react";
// Apollo
import { useQuery } from "@apollo/client";
// @ts-ignore
import { LOCATION_BY_INTERNAL_SLUG } from "./RequestVisitForm";
// Next
import { useRouter } from "next/router";
// Components
import { Heading, Link } from "@nypl/design-system-react-components";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function RequestVisitConfirmation() {
  const router = useRouter();

  const internalSlugArray = [];
  internalSlugArray.push(router.query.id);

  const { loading, error, data } = useQuery(LOCATION_BY_INTERNAL_SLUG, {
    variables: {
      contentType: "library",
      limit: 1,
      pageNumber: 1,
      filter: {
        internalSlug: {
          fieldName: "field_ts_slug",
          operator: "IN",
          value: internalSlugArray,
        },
      },
    },
  });

  const locationName = data?.allLocations?.items[0]?.name;
  const locationUrl = `${NEXT_PUBLIC_NYPL_DOMAIN}${data?.allLocations?.items[0]?.url}`;

  if (error) {
    return <div>Error while loading locations.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Heading
        className="request-visit__header"
        level="two"
        text="Thank You!"
      />
      <p>
        We&apos;ve received your request and will get back to you within 48
        hours.
      </p>
      <Link type="action" href={locationUrl}>
        Back to {locationName}
      </Link>
    </div>
  );
}

export default RequestVisitConfirmation;
