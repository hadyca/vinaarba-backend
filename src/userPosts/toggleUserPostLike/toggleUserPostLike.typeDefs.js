import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleUserPostLike(userPostId: Int!): MutationResponse!
  }
`;
