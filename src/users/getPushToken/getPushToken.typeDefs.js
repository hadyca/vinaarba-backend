import { gql } from "graphql-tag";

export default gql`
  type getPushTokenResult {
    ok: Boolean!
    error: String
    pushToken: String
  }

  type Mutation {
    getPushToken(userId: Int!, pushToken: String!): getPushTokenResult!
  }
`;
