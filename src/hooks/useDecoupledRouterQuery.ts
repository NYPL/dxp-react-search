import { gql, useQuery } from "@apollo/client";

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

function useDecoupledRouterQuery(slug: string) {
  // Run decoupled router query to get uuid.
  /*const { data: decoupledRouterData } = useQuery(DECOUPLED_ROUTER_QUERY, {
    variables: {
      path: slug,
    },
  });
  const uuid = decoupledRouterData?.decoupledRouter?.id;
  return uuid;
  */

  return useQuery(DECOUPLED_ROUTER_QUERY, {
    variables: {
      path: slug,
    },
  });
}

export default useDecoupledRouterQuery;
