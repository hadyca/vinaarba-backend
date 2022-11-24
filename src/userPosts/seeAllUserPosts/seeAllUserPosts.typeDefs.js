import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAllUserPosts(offset: Int!): [UserPost]
  }
`;
