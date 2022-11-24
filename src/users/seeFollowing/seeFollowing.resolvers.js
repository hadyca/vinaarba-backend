import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { userId, offset }) => {
      const existingUser = await client.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });
      if (!existingUser) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
        };
      }
      const following = await client.user
        .findUnique({ where: { id: userId } })
        .following({
          take: 15,
          skip: offset,
          orderBy: {
            createdAt: "desc",
          },
        });
      return following;
    },
  },
};
