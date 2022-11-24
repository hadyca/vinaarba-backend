import client from "../client";
import { getUserCompany } from "../companies/companies.utils";

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    myCompany: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return client.company.findUnique({
        where: {
          userId: id,
        },
      });
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: { some: { id } },
        },
      });
      return Boolean(exists);
    },
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    totalUserPosts: ({ id }) =>
      client.userPost.count({
        where: {
          userId: id,
          deleted: false,
        },
      }),
    totalCompanyPosts: async ({ id }) => {
      const userCompany = await getUserCompany(id);
      if (!userCompany) {
        return 0;
      }
      const countingPost = await client.companyPost.count({
        where: {
          companyId: userCompany.id,
          deleted: false,
        },
      });
      return countingPost;
    },
  },
};
