import { gql } from "graphql-tag";

export default gql`
  type UserPostReComment {
    id: Int!
    user: User!
    payload: String!
    isMine: Boolean!
    userPostComment: UserPostComment
    createdAt: String!
    updatedAt: String!
  }
`;
