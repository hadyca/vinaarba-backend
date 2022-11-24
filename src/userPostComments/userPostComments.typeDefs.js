import { gql } from "graphql-tag";

export default gql`
  type UserPostComment {
    id: Int!
    user: User!
    userPost: UserPost!
    payload: String!
    isMine: Boolean!
    userPostReComments: [UserPostReComment]
    createdAt: String!
    updatedAt: String!
  }
`;
