import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAllNotification(offset: Int!): [Notification]
  }
`;
