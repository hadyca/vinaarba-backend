import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    companyPostReCommentReport(
      companyPostReCommentId: Int!
      reason: String!
    ): MutationResponse!
  }
`;
