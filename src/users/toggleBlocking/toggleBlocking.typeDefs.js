import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleBlocking(userId: Int!): User!
  }
`;
