import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateLanguage(language: String!): MutationResponse!
  }
`;
