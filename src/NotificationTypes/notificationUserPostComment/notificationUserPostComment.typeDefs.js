import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    notificationUserPostComment(state: Boolean!): MutationResponse!
  }
`;
