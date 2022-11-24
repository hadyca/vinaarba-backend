import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteCompanyPostReComment(reCommentId: Int!): MutationResponse!
  }
`;
