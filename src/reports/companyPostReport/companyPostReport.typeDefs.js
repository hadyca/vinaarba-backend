import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    companyPostReport(companyPostId: Int!, reason: String!): MutationResponse!
  }
`;
