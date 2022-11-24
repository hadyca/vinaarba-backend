import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    uploadUserPost(
      fileUrl: [Upload]
      content: String!
      categoryId: Int!
    ): UserPost
  }
`;
