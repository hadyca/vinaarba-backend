import { gql } from "graphql-tag";

export default gql`
  type CompanyPostComment {
    id: Int!
    user: User!
    companyPost: CompanyPost!
    payload: String!
    isMine: Boolean!
    companyPostReComments: [CompanyPostReComment]
    createdAt: String!
    updatedAt: String!
  }
`;
