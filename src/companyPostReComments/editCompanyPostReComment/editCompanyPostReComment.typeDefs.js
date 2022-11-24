import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editCompanyPostReComment(
      reCommentId: Int!
      payload: String!
    ): MutationResponse!
  }
`;
