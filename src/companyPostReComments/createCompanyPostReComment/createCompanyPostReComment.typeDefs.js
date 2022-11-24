import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createCompanyPostReComment(
      companyPostCommentId: Int!
      payload: String!
    ): CompanyPostReComment
  }
`;
