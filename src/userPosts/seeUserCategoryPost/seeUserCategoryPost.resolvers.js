import client from "../../client";

export default {
  Query: {
    seeUserCategoryPost: (_, { categoryId, offset }) =>
      client.userPost.findMany({
        where: {
          categoryId,
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
