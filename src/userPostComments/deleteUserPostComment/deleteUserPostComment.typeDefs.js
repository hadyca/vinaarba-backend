import { gql } from "graphql-tag";

export default gql`
  type deleteUserPostResult {
    ok: Boolean!
    error: String
    totalRecomments: Int!
  }

  type Mutation {
    deleteUserPostComment(commentId: Int!): deleteUserPostResult!
  }
`;
