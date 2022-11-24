import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserPostComment(userPostCommentId: Int!): UserPostComment
  }
`;
