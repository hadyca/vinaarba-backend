import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFavoriteCompanyPosts(offset: Int!): [CompanyPost]!
  }
`;
