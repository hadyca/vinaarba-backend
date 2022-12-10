import { gql } from "graphql-tag";

export default gql`
  type CompanyPost {
    id: Int!
    company: Company!
    file: [File]
    title: String!
    workingDay: WorkingDay
    dayOption: Boolean!
    startTime: Int!
    finishTime: Int!
    timeOption: Boolean!
    wageTypeId: Int!
    wage: String!
    contactNumber: String!
    email: String!
    content: String!
    totalCompanyPostLikes: Int!
    totalCompanyPostComments: Int!
    isFavorite: Boolean!
    isBlocking: Boolean!
    companyPostComments: [CompanyPostComment]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
    deleted: Boolean!
  }

  type CompanyPostLike {
    id: Int!
    companyPost: CompanyPost!
    createdAt: String!
    updatedAt: String!
  }

  type File {
    id: Int!
    fileUrl: String!
    fileKey: String!
  }

  type WorkingDay {
    id: Int!
    mon: Boolean!
    tue: Boolean!
    wed: Boolean!
    thu: Boolean!
    fri: Boolean!
    sat: Boolean!
    sun: Boolean!
  }
`;
