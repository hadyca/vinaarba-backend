import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserCategoryPost(categoryId: Int!, offset: Int!): [UserPost]
  }
`;
