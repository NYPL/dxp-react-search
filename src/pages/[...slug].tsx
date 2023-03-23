import * as React from "react";
// Next
import { GetStaticPropsContext } from "next";
// Apollo
import withApollo from "../apollo/withApollo";
// Section front
import SectionFrontPage, {
  SECTION_FRONT_QUERY,
} from "../components/section-fronts/SectionFrontPage/SectionFrontPage";
// HOC
import withDrupalRouter, {
  WithDrupalRouterReturnProps,
} from "../apollo/with-drupal-router";

type CatchAllRoutesPageProps = {
  slug: string;
  uuid: string;
  isPreview: boolean;
  revisionId: string;
  bundle?: string;
};

function CatchAllRoutesPage({
  slug,
  uuid,
  isPreview,
  revisionId,
  bundle,
}: CatchAllRoutesPageProps) {
  // Determine which page template to use by bundle.
  if (bundle === "section_front") {
    return (
      <SectionFrontPage
        uuid={uuid}
        slug={slug}
        isPreview={isPreview}
        revisionId={revisionId}
      />
    );
  }

  // @TODO shouldnt this return <Error statusCode={404} /> instead?
  return null;
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

  let GQL_QUERY = SECTION_FRONT_QUERY;
  // Future example for handling additional content types, would look like this:
  // if (bundle === "page") {
  //   QUERY = PAGE_QUERY;
  // }

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
    // Set revalidate to 1 min.
    revalidate: 60,
  };
});

export default withApollo(CatchAllRoutesPage as any);
