import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCompany(companyId: Int): Company
  }
`;
