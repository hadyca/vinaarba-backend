import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    requestSecret(language: String!, email: String!): MutationResponse!
  }
`;
