import { gql } from "graphql-tag";

export default gql`
  type loginResult {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    login(
      email: String!
      password: String!
      pushToken: String!
      language: String!
    ): loginResult!
  }
`;
