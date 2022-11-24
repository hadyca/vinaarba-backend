import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFollowing(userId: Int!, offset: Int!): [User]!
  }
`;
