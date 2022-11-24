import { gql } from "graphql-tag";

export default gql`
  type User {
    id: Int!
    username: String!
    usernameEditDate: String
    email: String!
    avatarUrl: String
    bio: String
    alertStatus: Boolean!
    language: String!
    isMe: Boolean!
    following: [User]
    followers: [User]
    isFollowing: Boolean!
    totalFollowers: Int!
    favoriteUserPosts: [UserPost]
    favoriteCompanyPosts: [CompanyPost]
    totalFollowing: Int!
    totalUserPosts: Int!
    totalCompanyPosts: Int!
    userPosts: [UserPost]
    createdAt: String!
    updatedAt: String!
    myCompany: Company
  }

  type Notification {
    id: Int!
    user: User!
    receiverId: Int!
    type: String!
    postId: Int
    contentId: Int!
    createdAt: String!
  }
`;
