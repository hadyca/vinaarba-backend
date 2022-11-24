import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteUserPost(userPostId: Int!): MutationResponse!
  }
`;
