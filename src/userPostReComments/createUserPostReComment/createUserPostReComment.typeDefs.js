import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createUserPostReComment(
      userPostCommentId: Int!
      payload: String!
    ): UserPostReComment
  }
`;
