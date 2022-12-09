import { gql } from "graphql-tag";

export default gql`
  type UserPost {
    id: Int!
    user: User!
    file: [File]
    content: String!
    categoryId: Int!
    totalUserPostLikes: Int!
    totalUserPostComments: Int!
    isFavorite: Boolean!
    isBlocking: Boolean!
    userPostComments: [UserPostComment]
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }

  type UserPostLike {
    id: Int!
    userPost: UserPost!
    createdAt: String!
    updatedAt: String!
  }

  type File {
    id: Int!
    fileUrl: String!
    fileKey: String!
  }
`;
