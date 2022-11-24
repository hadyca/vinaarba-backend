import { gql } from "graphql-tag";

export default gql`
  type deleteCompanyPostResult {
    ok: Boolean!
    error: String
    totalRecomments: Int!
  }

  type Mutation {
    deleteCompanyPostComment(commentId: Int!): deleteCompanyPostResult!
  }
`;
