import { gql } from "graphql-tag";

export default gql`
  type confirmSecretResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    confirmSecret(email: String!, secret: String!): confirmSecretResult!
  }
`;
