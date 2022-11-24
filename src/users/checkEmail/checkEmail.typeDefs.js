import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    checkEmail(language: String!, email: String!): MutationResponse!
  }
`;
