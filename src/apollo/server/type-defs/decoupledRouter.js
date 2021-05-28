import gql from 'graphql-tag';

export const typeDefs = gql`
  type DecoupledRouter {
    id: ID!
    redirect: Redirect
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