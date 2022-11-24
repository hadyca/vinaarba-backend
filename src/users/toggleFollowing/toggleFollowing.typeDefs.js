import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleFollowing(userId: Int!): User!
  }
`;
