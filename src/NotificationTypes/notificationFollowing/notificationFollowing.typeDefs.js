import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    notificationFollowing(state: Boolean!): MutationResponse!
  }
`;
