import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteUser(userId: Int!): MutationResponse!
  }
`;
