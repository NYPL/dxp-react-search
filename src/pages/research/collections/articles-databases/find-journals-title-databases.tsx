import React from "react";
// Components
import { Link } from "@nypl/design-system-react-components";
import Heading from "../../../../components/shared/Heading";
import PageContainer from "../../../../components/online-resources/layouts/PageContainer";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "../../../../utils/config";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

export default function OnlineResourcesFindJournalsTitlePage() {
  return (
    <PageContainer
      metaTags={{
        title:
          "Find E-Journals and Scholarly E-books by Title in Databases | New York Public Library",
        description:
          "Use the resources below to find which databases have the full text of specific magazines or journals.",
      }}
      breadcrumbs={[
        {
          text: "Scholarly Journals",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}/find-journals-title-databases`,
        },
      ]}
      showContentHeader={false}
      contentPrimary={
        <div>
          <Heading level="h1">
            Find E-Journals and Scholarly E-books by Title in Databases
          </Heading>
          <p>
            Use the resources below to find which databases have the full text
            of specific magazines or journals.
          </p>
          <p>
            <Link
              href="http://tm9qt7lg9g.search.serialssolutions.com/"
              type="external"
            >
              Full-text Journals and Scholarly E-books&nbsp;(from Home)
            </Link>
          </p>
          <p>
            <Link
              href="http://wu9fb9wh4a.search.serialssolutions.com/"
              type="external"
            >
              Full-text Journals and Scholarly E-Books (on-site in the Library)
            </Link>
          </p>
          <p>
            To find magazines, newspapers and journals not available
            electronically search the Catalog.
          </p>
          <p>
            <Link href="https://catalog.nypl.org/search/s">
              Journal Title Search in the NYPL Catalog
            </Link>
          </p>
          <br />
          <p>
            *During the temporary closure of The New York Public Library&apos;s
            locations, we are offering remote access to additional databases,
            which are not regularly available from Home. Please checkout this
            page for more details. Please note that the links on this page will
            not reflect the new databases we just added for remote access.
          </p>
        </div>
      }
    />
  );
}
