import client from "../../client";

export default {
  Query: {
    seeUserAllCompanyPosts: (_, { companyId, offset }) =>
      client.companyPost.findMany({
        where: {
          companyId,
          NOT: {
            deleted: true,
          },
        },
        take: 5,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
