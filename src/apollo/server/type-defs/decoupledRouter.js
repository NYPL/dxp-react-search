import gql from "graphql-tag";

export const typeDefs = gql`
  type DecoupledRouter {
    id: ID!
    uuid: String
    redirect: Redirect
    responseInfo: ResponseInfo!
  }

  type Redirect {
    from: String
    to: String
    status: String
  }

  extend type Query {
    decoupledRouter(path: String): DecoupledRouter
  }
`;
