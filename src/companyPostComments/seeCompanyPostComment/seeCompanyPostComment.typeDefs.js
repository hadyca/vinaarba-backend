import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCompanyPostComment(companyPostCommentId: Int!): CompanyPostComment
  }
`;
