import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCompanyPost(companyPostId: Int!): CompanyPost!
  }
`;
