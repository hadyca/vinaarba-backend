import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteCompany(companyId: Int!): MutationResponse!
  }
`;
