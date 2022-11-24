import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteUserPostReComment(reCommentId: Int!): MutationResponse!
  }
`;
