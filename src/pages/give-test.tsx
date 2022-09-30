import * as React from "react";
import { Box, Heading, Hero } from "@nypl/design-system-react-components";
import DonationPromo from "../components/section-fronts/DonationPromo";
import PageContainer from "./../components/shared/layouts/PageContainer";
// Content + config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function SectionFrontsGivePage() {
  const description =
    "Government funding pays only a portion of the Library's operating expenses. We depend on support from generous individuals like you to help keep our books, classes, and resources FREE for all New Yorkers.";

  return (
    <PageContainer
      metaTags={{
        title: "Give",
        description: description,
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
        },
        {
          text: "Give",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
        },
      ]}
      breadcrumbsColor="booksAndMore"
      wrapperClass="nypl--section-fronts"
      contentHeader={
        <>
          <Hero
            heroType="tertiary"
            heading={<Heading level="one" text="Give" />}
            subHeaderText={description}
            backgroundColor="brand.primary"
            foregroundColor="ui.white"
          />
          <DonationPromo
            id="give-donation"
            heading="Donate to NYPL"
            description="Each dollar you give helps the Library serve people of all ages,
  backgrounds, and beliefs. Monthly donors provide much-needed
  consistent support to the Library. Receive a tote as a thank you
  gift."
            defaultAmount="200"
            donationFormBaseUrl="https://secure.nypl.org/site/Donation2?7825.donation=form1&df_id=7825"
            donationOtherLevelId="14860"
          />
        </>
      }
      contentPrimary={<Box backgroundColor="red">contentPrimary!</Box>}
    />
  );
}

export default SectionFrontsGivePage;
