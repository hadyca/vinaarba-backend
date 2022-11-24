import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleCompanyPostLike(companyPostId: Int!): MutationResponse!
  }
`;
