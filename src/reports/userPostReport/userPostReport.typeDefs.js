import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    userPostReport(userPostId: Int!, reason: String!): MutationResponse!
  }
`;
