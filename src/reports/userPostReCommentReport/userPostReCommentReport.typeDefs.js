import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    userPostReCommentReport(
      userPostReCommentId: Int!
      reason: String!
    ): MutationResponse!
  }
`;
