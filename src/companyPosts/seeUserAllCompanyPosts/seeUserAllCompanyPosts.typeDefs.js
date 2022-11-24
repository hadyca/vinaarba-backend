import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserAllCompanyPosts(companyId: Int!, offset: Int!): [CompanyPost]
  }
`;
