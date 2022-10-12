import * as React from "react";
// Next
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
// Apollo
import withApollo from "../apollo/withApollo";
import { initializeApollo } from "../apollo/withApollo/apollo";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";
// Section front
import SectionFrontPage, {
  sectionFrontsPaths,
  sectionFrontsSlugs,
  SECTION_FRONT_QUERY,
} from "../components/section-fronts/SectionFrontPage/SectionFrontPage";

type CatchAllRoutesPageProps = {
  slug: string;
  uuid: string;
  isPreview: boolean;
  revisionId: string;
};

interface CatchAllRoutesParams extends ParsedUrlQuery {
  slug: string;
}

function CatchAllRoutesPage({
  slug,
  uuid,
  isPreview,
  revisionId,
}: CatchAllRoutesPageProps) {
  // Determine which page template to use by current slug.
  if (sectionFrontsSlugs.includes(`/${slug}`)) {
    return (
      <SectionFrontPage
        uuid={uuid}
        isPreview={isPreview}
        revisionId={revisionId}
      />
    );
  }

  return <div>Something else?</div>;
}

export async function getStaticPaths() {
  return {
    // @TODO the paths shouldn't be hardcoded, b/c if a node is unpublished but included here,
    // the build will break.
    paths: sectionFrontsPaths,
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps<
  CatchAllRoutesPageProps,
  CatchAllRoutesParams
> = async (context) => {
  const apolloClient = initializeApollo();

  const slug = context.params?.slug[0];
  const { previewData }: any = context;

  let uuid;
  let revisionId = null;

  // Preview mode.
  const isPreview = context.preview ? context.preview : false;

  // const uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
  // Set the uuid for preview mode.
  if (isPreview) {
    uuid = previewData.uuid;
    revisionId = previewData.revisionId;
  } else {
    // Get the slug from the params object.
    // Get decoupled router data.
    const decoupledRouterData = await apolloClient.query({
      query: DECOUPLED_ROUTER_QUERY,
      variables: {
        path: slug,
      },
    });

    uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
    // Redirect logic
    // @TODO this doesn't work, @SEE https://github.com/vercel/next.js/discussions/11346
    // const redirect = await decoupledRouterData?.data?.decoupledRouter?.redirect;
    // // Route is not found in CMS, so set 404 status.
    // if (uuid === null && !redirect) {
    //   return {
    //     notFound: true,
    //   };
    // }

    // // Handle the redirect.
    // if (redirect) {
    //   return {
    //     redirect: {
    //       statusCode: 301,
    //       destination: redirect.to,
    //     },
    //   };
    // }
  }

  try {
    await apolloClient.query({
      query: SECTION_FRONT_QUERY,
      variables: {
        id: uuid,
        ...(isPreview && {
          preview: true,
          revisionId: revisionId,
        }),
      },
    });
  } catch (error) {
    console.error(`getStaticProps: ${error}`);
  }

  return {
    props: {
      slug: slug,
      uuid: uuid,
      isPreview: isPreview,
      ...(revisionId && {
        revisionId: revisionId,
      }),
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 600,
  };
};

export default withApollo(CatchAllRoutesPage as any);
