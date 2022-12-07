import * as React from "react";
import { NextPageContext } from "next";
import { ApolloError } from "@apollo/client/errors";
import {
  Button,
  Box,
  Flex,
  Heading,
  Logo,
  Text,
} from "@nypl/design-system-react-components";
import PageContainer from "../components/shared/layouts/PageContainer";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
// Next
import { useRouter } from "next/router";

type ErrorProps = {
  statusCode: number;
};

type NextError = { statusCode?: number | undefined };

type ErrorContext = Omit<NextPageContext, "err"> & {
  err: ApolloError | NextError;
};

function Error({ statusCode }: ErrorProps) {
  let title = "We're Sorry ...";
  let description =
    "The page you requested is either unavailable or you need permission to view the content.";
  if (statusCode === 500) {
    title = "Error!";
  }
  if (statusCode === 503) {
    title = "Site Under Maintenance";
    description =
      "The New York Public Library is currently under maintenance. We should be back shortly. Thank you for your patience.";
  }

  const router = useRouter();

  const handleClick = () => {
    router.push(NEXT_PUBLIC_NYPL_DOMAIN as string);
  };

  return (
    <PageContainer
      metaTags={{
        title: title,
        description: description,
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: NEXT_PUBLIC_NYPL_DOMAIN as string,
        },
        {
          text: title,
          // DS forces us to pass a url here, even tho the last item is never displayed as a link.
          url: NEXT_PUBLIC_NYPL_DOMAIN as string,
        },
      ]}
      breadcrumbsColor="whatsOn"
      wrapperClass={`scout-error__${statusCode}`}
      contentHeader={null}
      contentPrimary={
        <Flex direction={{ sm: "column", md: "row" }} alignItems="center">
          <Box overflow="hidden" width={{ base: "60%", md: "50%", lg: "40%" }}>
            <Box ml={{ base: 0, md: "-60px" }}>
              <Logo
                decorative
                id="nypl-lion-logo"
                name="nyplLionBlack"
                size="default"
                opacity={0.2}
              />
            </Box>
          </Box>
          <Box
            pl={{ base: "0", md: "100px" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "24px", md: "48px", lg: "72px" }}
              color="brand.primary"
            >
              {title}
            </Heading>
            <Text mb={{ base: "m", md: "xl" }}>{description}</Text>
            <Button
              buttonType="primary"
              id="large-primary"
              m={{ base: "0 auto", md: "0" }}
              onClick={handleClick}
            >
              Back to Home
            </Button>
          </Box>
        </Flex>
      }
      contentBottom={null}
    />
  );
}

// Only gets called if app throws an error either on client or server side.
Error.getInitialProps = async ({ res, err }: ErrorContext) => {
  let statusCode;
  if (err.hasOwnProperty("graphQLErrors")) {
    statusCode = (err as any).graphQLErrors[0].extensions?.response?.status;
  } else {
    statusCode = (err as NextError).statusCode;
  }

  if (res) {
    // Set the response headers to the correct status code.
    res.statusCode = statusCode;
    // Pass the statusCode prop to the component.
    return { statusCode: statusCode };
  }
};

export default Error;
