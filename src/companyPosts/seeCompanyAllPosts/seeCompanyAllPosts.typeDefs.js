import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCompanyAllPosts(companyId: Int!, offset: Int!): [CompanyPost]
  }
`;
