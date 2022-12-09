import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBlocking(offset: Int!): [User]!
  }
`;
