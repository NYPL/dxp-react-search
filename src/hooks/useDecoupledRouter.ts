import { gql, useQuery } from "@apollo/client";
import { NextRouter } from "next/router";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export const DECOUPLED_ROUTER_QUERY = gql`
  query DecoupledRouterQuery($path: String) {
    decoupledRouter(path: $path) {
      id
      uuid
      redirect {
        from
        to
        status
      }
      responseInfo {
        httpStatus
        httpStatusCode
        apiPath
      }
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
  const { data: decoupledRouterData } = useQuery(DECOUPLED_ROUTER_QUERY, {
    variables: {
      path: slug,
    },
  });
  const uuid = decoupledRouterData?.decoupledRouter?.uuid;
  const responseInfo = decoupledRouterData?.decoupledRouter?.responseInfo;

  return {
    uuid: uuid,
    isPreview: isPreview,
    responseInfo: responseInfo,
  };
}

export default useDecoupledRouter;
