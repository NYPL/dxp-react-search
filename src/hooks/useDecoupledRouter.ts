import { gql, useQuery } from "@apollo/client";
import { NextRouter } from "next/router";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export const DECOUPLED_ROUTER_QUERY = gql`
  query DecoupledRouterQuery($path: String, $isPreview: Boolean) {
    decoupledRouter(path: $path, isPreview: $isPreview) {
      id
      uuid
      redirect {
        from
        to
        status
      }
      bundle
    }
  }
`;

function useDecoupledRouter(nextRouter: NextRouter) {
  // Preview mode.
  const isPreview =
    nextRouter.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    nextRouter.query.uuid
      ? true
      : false;
  // Set the uuid for preview mode.
  if (isPreview) {
    return {
      isPreview: isPreview,
      uuid: nextRouter.query.uuid,
    };
  }
  // Not preview mode, so run the query to resolve a uuid from a slug.
  const slug = nextRouter.asPath;
  // @TODO decide the order of execution, had to unable the rule because the query is running conditionally
  // not on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: decoupledRouterData } = useQuery(DECOUPLED_ROUTER_QUERY, {
    variables: {
      path: slug,
    },
  });
  const uuid = decoupledRouterData?.decoupledRouter?.uuid;
  return {
    uuid: uuid,
    isPreview: isPreview,
  };
}

export default useDecoupledRouter;
