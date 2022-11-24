import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    contact(type: String!, content: String!, email: String!): MutationResponse!
  }
`;
