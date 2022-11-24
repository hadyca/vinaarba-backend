import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFavoriteCompanyPosts: protectedResolver(
      async (_, { offset }, { loggedInUser }) => {
        const ok = await client.user.findUnique({
          where: { id: loggedInUser.id },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "유저를 찾을 수 없습니다.",
          };
        }
        const favoritePosts = await client.user
          .findUnique({ where: { id: loggedInUser.id } })
          .favoriteCompanyPosts({
            take: 5,
            skip: offset,
            orderBy: {
              createdAt: "desc",
            },
          });
        return favoritePosts;
      }
    ),
  },
};
