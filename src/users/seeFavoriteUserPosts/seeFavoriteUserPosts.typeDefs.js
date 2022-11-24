import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFavoriteUserPosts(offset: Int!): [UserPost]!
  }
`;
