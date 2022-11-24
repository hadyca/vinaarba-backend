import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAllCompanyPosts(offset: Int!): [CompanyPost]
  }
`;
