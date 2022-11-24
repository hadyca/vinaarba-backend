import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserPost(userPostId: Int!): UserPost
  }
`;
