import { gql } from "graphql-tag";

export default gql`
  type finalStepAccountResult {
    ok: Boolean!
    token: String!
    error: String
  }

  type Mutation {
    finalStepAccount(
      password: String!
      email: String!
      username: String!
      language: String!
      pushToken: String!
    ): finalStepAccountResult!
  }
`;
