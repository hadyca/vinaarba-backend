import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createCompanyPostComment(
      companyPostId: Int!
      payload: String!
    ): CompanyPostComment
  }
`;
