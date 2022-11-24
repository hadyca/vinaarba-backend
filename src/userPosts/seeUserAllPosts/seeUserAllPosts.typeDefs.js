import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserAllPosts(userId: Int!, offset: Int!): [UserPost]
  }
`;
