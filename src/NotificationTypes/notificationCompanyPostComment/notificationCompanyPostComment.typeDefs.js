import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    notificationCompanyPostComment(state: Boolean!): MutationResponse!
  }
`;
