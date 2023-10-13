import * as React from "react";
// Next
import { GetStaticPropsContext } from "next";
// Apollo
import withApollo from "../apollo/withApollo";
// Page Templates
import SectionFrontPage, {
  SECTION_FRONT_QUERY,
} from "../components/section-fronts/SectionFrontPage/SectionFrontPage";
import PagePage, { PAGE_QUERY } from "../components/pages/Page";
// HOC
import withDrupalRouter, {
  WithDrupalRouterReturnProps,
} from "../apollo/with-drupal-router";

type CatchAllRoutesPageProps = {
  slug: string;
  uuid: string;
  isPreview: boolean;
  revisionId: string;
  bundle: string;
};

const BundleMap: any = {
  page: {
    query: PAGE_QUERY,
    component: PagePage,
  },
  section_front: {
    query: SECTION_FRONT_QUERY,
    component: SectionFrontPage,
  },
};

function CatchAllRoutesPage({
  slug,
  uuid,
  isPreview,
  revisionId,
  bundle,
}: CatchAllRoutesPageProps) {
  const pageComponent = BundleMap[bundle].component;

  return React.createElement(pageComponent, {
    uuid: uuid,
    slug: slug,
    isPreview: isPreview,
    revisionId: revisionId,
  });
}

export async function getStaticPaths() {
  return {
    // This tells nextjs not generated the page at build time, but ssr for the first request.
    // Follow up requests will be serving static content.
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = withDrupalRouter(async function (
  _context: GetStaticPropsContext,
  props: WithDrupalRouterReturnProps
) {
  const { uuid, revisionId, slug, isPreview, bundle, apolloClient } = props;

  const GQL_QUERY = BundleMap[bundle].query;

  await apolloClient.query({
    query: GQL_QUERY,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
        revisionId: revisionId,
      }),
    },
  });

  return {
    props: {
      slug: slug,
      uuid: uuid,
      isPreview: isPreview,
      ...(revisionId && {
        revisionId: revisionId,
      }),
      bundle: bundle,
      initialApolloState: apolloClient.cache.extract(),
    },
    // Turn off request based revalidation.
    revalidate: false,
  };
});

export default withApollo(CatchAllRoutesPage as any);
