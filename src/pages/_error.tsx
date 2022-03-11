import React from "react";
import {
  Box,
  ColorVariants,
  Heading,
  HeadingLevels,
  Link,
  Text,
} from "@nypl/design-system-react-components";
import PageContainer from "../components/shared/layouts/PageContainer";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

type ErrorProps = {
  statusCode: number;
};

function Error({ statusCode }: ErrorProps) {
  return (
    <PageContainer
      metaTags={{
        title: "We're Sorry",
        description:
          "The page you requested is either unavailable or you need permission to view the content.",
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
        },
      ]}
      breadcrumbsColor={ColorVariants.Research}
      wrapperClass="nypl--404"
      contentHeader={null}
      contentPrimary={
        <Box>
          <Heading level={HeadingLevels.One}>We're Sorry...</Heading>
          <Box>
            <Text>
              The page you requested is either unavailable or you need
              permission to view the content.
            </Text>
            <Text>
              If you can't find the page you're looking for, please try our{" "}
              <Link href="https://www.nypl.org/get-help/contact-us">
                ASK NYPL
              </Link>{" "}
              service.
            </Text>
            <Box fontWeight="bold">{statusCode}</Box>
          </Box>
        </Box>
      }
      contentBottom={null}
    />
  );
}

/*Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
*/

export default Error;
