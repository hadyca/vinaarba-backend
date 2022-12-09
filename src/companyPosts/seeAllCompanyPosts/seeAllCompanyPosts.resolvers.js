import client from "../../client";

export default {
  Query: {
    seeAllCompanyPosts: (_, { offset }) =>
      client.companyPost.findMany({
        where: {
          NOT: {
            deleted: true,
          },
        },
        take: 10,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
