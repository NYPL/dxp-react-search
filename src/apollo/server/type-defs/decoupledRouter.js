import gql from "graphql-tag";

export const typeDefs = gql`
  type DecoupledRouter {
    id: ID!
    uuid: String
    redirect: Redirect
    bundle: String
  }

  type Redirect {
    from: String
    to: String
    status: String
  }

  extend type Query {
    decoupledRouter(path: String, isPreview: Boolean): DecoupledRouter
  }
`;
