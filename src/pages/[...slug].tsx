import * as React from "react";
// Next
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// Apollo
import withApollo from "../apollo/withApollo";
import { initializeApollo } from "../apollo/withApollo/apollo";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";
// Section front.
import SectionFrontPage, {
  sectionFrontsPaths,
  sectionFrontsSlugs,
  SECTION_FRONT_QUERY,
} from "../components/section-fronts/SectionFrontPage/SectionFrontPage";

function CatchAllRoutesPage({ uuid }: any) {
  const router = useRouter();
  const slug = router.asPath;

  if (sectionFrontsSlugs.includes(slug)) {
    return <SectionFrontPage uuid={uuid} />;
  }
  // Get the page slug
  return <div>Something else?</div>;
}

export async function getStaticPaths() {
  return {
    paths: sectionFrontsPaths,
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  // @ts-ignore
  // @see https://github.com/vercel/next.js/discussions/16522#discussioncomment-81590
  const { slug } = params;

  // Get decoupled router data.
  const decoupledRouterData = await apolloClient.query({
    query: DECOUPLED_ROUTER_QUERY,
    variables: {
      path: slug[0],
    },
  });

  const uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;

  await apolloClient.query({
    query: SECTION_FRONT_QUERY,
    variables: {
      id: uuid,
    },
  });

  return {
    props: {
      uuid: uuid,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60,
  };
};

export default withApollo(CatchAllRoutesPage);
