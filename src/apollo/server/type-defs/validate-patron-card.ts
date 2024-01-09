import gql from "graphql-tag";

export const validatePatronCardTypeDefs = gql`
  type PatronCard {
    id: ID!
    valid: Boolean
    message: String
  }

  extend type Query {
    validatePatronCard(barcode: String, pin: String): PatronCard
  }
`;
