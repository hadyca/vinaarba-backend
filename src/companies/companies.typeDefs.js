import { gql } from "graphql-tag";

export default gql`
  type Company {
    user: User!
    id: Int!
    companyName: String!
    addressStep1: String!
    addressStep2: String!
    addressStep3: String!
    email: String!
    aboutUs: String!
    contactNumber: String!
    totalEmployees: Int!
    isMyCompany: Boolean!
    companyPosts: [CompanyPost]
    createdAt: String!
    updatedAt: String!
  }
`;
