import * as React from "react";
import { NextPageContext } from "next";
import { ApolloError } from "@apollo/client/errors";
import { Box, Heading, Link, Text } from "@nypl/design-system-react-components";
import PageContainer from "../components/shared/layouts/PageContainer";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

type ErrorProps = {
  statusCode: number;
};

type NextError = { statusCode?: number | undefined };

type ErrorContext = Omit<NextPageContext, "err"> & {
  err: ApolloError | NextError;
};

// function ErrorContent({ statusCode }: ErrorProps) {
//   switch (statusCode) {
//     case 404:
//       return (
//         <Box>
//           <Text>
//             The page you requested is either unavailable or you need permission
//             to view the content.
//           </Text>
//           <Text>
//             If you can't find the page you're looking for, please try our{" "}
//             <Link href="https://www.nypl.org/get-help/contact-us">
//               ASK NYPL
//             </Link>{" "}
//             service.
//           </Text>
//           <Box fontWeight="bold" /*display="none" visibility="hidden"*/>
//             {statusCode}
//           </Box>
//         </Box>
//       );
//   }
// }

function Error({ statusCode }: ErrorProps) {
  let title = "We're Sorry ...";
  if (statusCode === 500) {
    title = "Error!";
  }
  if (statusCode === 503) {
    title = "Maintenance Mode";
  }

  return (
    <PageContainer
      metaTags={{
        title: title,
        description:
          "The page you requested is either unavailable or you need permission to view the content.",
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
      wrapperClass="nypl--404"
      contentHeader={null}
      contentPrimary={
        <Box minHeight="400px">
          <Heading level="one">{title}</Heading>
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
            <Box fontWeight="bold" /*display="none" visibility="hidden"*/>
              {statusCode}
            </Box>
          </Box>
        </Box>
      }
      contentBottom={null}
    />
  );
}

// Only gets called if app throws an error either on client or server side.
Error.getInitialProps = async ({ res, err }: ErrorContext) => {
  let statusCode;
  if (err.hasOwnProperty("graphQLErrors")) {
    statusCode = (err as ApolloError).graphQLErrors[0].extensions?.response
      ?.status;
  } else {
    statusCode = (err as NextError).statusCode;
  }

  // Set the response headers to the correct status code.
  if (res) {
    res.statusCode = statusCode;
  }
  // Pass the statusCode prop to the component.
  return { statusCode: statusCode };
};

export default Error;
