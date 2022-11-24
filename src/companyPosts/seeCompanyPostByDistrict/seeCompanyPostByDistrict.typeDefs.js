import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCompanyPostByDistrict(
      addressStep1_1: String
      addressStep1_2: String
      addressStep1_3: String
      addressStep1_4: String
      addressStep1_5: String
      addressStep2_1: String
      addressStep2_2: String
      addressStep2_3: String
      addressStep2_4: String
      addressStep2_5: String
      offset: Int!
    ): [CompanyPost]
  }
`;
