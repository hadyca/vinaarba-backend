import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    userReport(userId: Int!, reason: String!): MutationResponse!
  }
`;
