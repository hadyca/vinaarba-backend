import { gql } from "graphql-tag";

export default gql`
  type deletePushTokenResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deletePushToken(pushToken: String!): deletePushTokenResult!
  }
`;
