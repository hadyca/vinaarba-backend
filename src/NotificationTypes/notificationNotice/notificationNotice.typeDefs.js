import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    notificationNotice(state: Boolean!): MutationResponse!
  }
`;
