import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    notificationCompanyPostLike(state: Boolean!): MutationResponse!
  }
`;
