import { gql, useQuery } from "@apollo/client";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

const DECOUPLED_ROUTER_QUERY = gql`
  query DecoupledRouterQuery($path: String) {
    decoupledRouter(path: $path) {
      id
      uuid
      redirect {
        from
        to
        status
      }
    }
  }
`;

function useDecoupledRouter(slug: string, nextRouter: any) {
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

  const { data: decoupledRouterData } = useQuery(DECOUPLED_ROUTER_QUERY, {
    variables: {
      path: slug,
    },
  });

  const uuid = decoupledRouterData?.decoupledRouter?.uuid;
  return {
    isPreview: isPreview,
    uuid: uuid,
  };
}

export default useDecoupledRouter;
