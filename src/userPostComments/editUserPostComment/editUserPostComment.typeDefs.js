import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editUserPostComment(commentId: Int!, payload: String!): MutationResponse!
  }
`;
