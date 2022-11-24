import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleFavoriteUserPost(userPostId: Int!): UserPost!
  }
`;
