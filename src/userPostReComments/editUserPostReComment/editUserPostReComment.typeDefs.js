import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editUserPostReComment(
      reCommentId: Int!
      payload: String!
    ): MutationResponse!
  }
`;
