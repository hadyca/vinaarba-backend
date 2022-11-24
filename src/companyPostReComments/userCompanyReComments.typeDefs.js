import { gql } from "graphql-tag";

export default gql`
  type CompanyPostReComment {
    id: Int!
    user: User!
    payload: String!
    isMine: Boolean!
    companyPostComment: CompanyPostComment
    createdAt: String!
    updatedAt: String!
  }
`;
