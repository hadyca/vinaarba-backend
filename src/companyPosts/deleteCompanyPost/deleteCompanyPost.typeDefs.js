import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteCompanyPost(companyPostId: Int!): MutationResponse!
  }
`;
