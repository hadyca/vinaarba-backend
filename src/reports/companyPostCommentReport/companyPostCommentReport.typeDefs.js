import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    companyPostCommentReport(
      companyPostCommentId: Int!
      reason: String!
    ): MutationResponse!
  }
`;
