import { gql } from "graphql-tag";

export default gql`
  type createPasswordResult {
    ok: Boolean!
    token: String!
    error: String
  }

  type Mutation {
    createPassword(
      password: String!
      email: String!
      username: String!
      language: String!
      pushToken: String!
    ): createPasswordResult!
  }
`;
