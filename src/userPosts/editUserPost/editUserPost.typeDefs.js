import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editUserPost(
      userPostId: Int!
      fileUrl: [Upload]
      content: String!
      categoryId: Int!
    ): MutationResponse!
  }
`;
