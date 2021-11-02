import gql from "graphql-tag";

export const typeDefs = gql`
  input SendEmailInput {
    emailTo: String!
    emailCc: String
    emailBody: String
  }

  type SendEmailPayload {
    status: String
    emailTo: String
    emailCc: String
    emailBody: String
    enableEmail: Boolean
  }

  type Mutation {
    sendEmail(input: SendEmailInput!): SendEmailPayload
  }
`;
