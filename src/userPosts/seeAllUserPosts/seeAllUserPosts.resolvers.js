import client from "../../client";

export default {
  Query: {
    seeAllUserPosts: async (_, { offset }) =>
      client.userPost.findMany({
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
