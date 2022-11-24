import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFollowers(userId: Int!, offset: Int!): [User]!
  }
`;
