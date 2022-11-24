import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserPostReComments(userPostCommentId: Int!): [UserPostReComment]
  }
`;
