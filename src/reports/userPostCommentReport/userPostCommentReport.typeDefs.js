import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    userPostCommentReport(
      userPostCommentId: Int!
      reason: String!
    ): MutationResponse!
  }
`;
