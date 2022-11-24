import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editCompanyPostComment(commentId: Int!, payload: String!): MutationResponse!
  }
`;
