import gql from "graphql-tag";

export const typeDefs = gql`
  input SendEmailInput {
    emailTo: String!
    emailCc: String
    emailBody: String
  }

  type SendEmailPayload {
    statusCode: Int
    message: String
    emailEnable: Boolean
    formData: SendEmailPayloadFormData
  }

  type SendEmailPayloadFormData {
    emailTo: String
    emailCc: String
    emailBody: String
  }

  type Mutation {
    sendEmail(input: SendEmailInput!): SendEmailPayload
  }
`;
