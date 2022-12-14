import client from "../../client";

export default {
  Query: {
    seeUserAllPosts: (_, { userId, offset }) =>
      client.userPost.findMany({
        where: {
          userId,
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
