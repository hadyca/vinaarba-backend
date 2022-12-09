import client from "../../client";

export default {
  Query: {
    seeCompanyAllPosts: (_, { companyId, offset }) =>
      client.companyPost.findMany({
        where: {
          company: {
            id: companyId,
          },
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
