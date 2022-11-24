import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createUserPostComment(userPostId: Int!, payload: String!): UserPostComment
  }
`;
