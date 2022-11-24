import { gql } from "graphql-tag";

export default gql`
  type NotificationType {
    id: Int!
    user: User!
    notice: Boolean!
    userPostLike: Boolean!
    userPostComment: Boolean!
    companyPostLike: Boolean!
    companyPostComment: Boolean!
    following: Boolean!
  }
`;
