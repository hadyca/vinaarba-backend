import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCompanyPostReComments(companyPostCommentId: Int!): [CompanyPostReComment]
  }
`;
