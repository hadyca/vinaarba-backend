import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteUserPost: protectedResolver(
      async (_, { userPostId }, { loggedInUser }) => {
        const post = await client.userPost.findUnique({
          where: {
            id: userPostId,
          },
          select: {
            userId: true,
          },
        });
        if (!post) {
          return {
            ok: false,
            error: "해당 게시글을 찾을 수 없습니다.",
          };
        } else if (post.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "권한이 없습니다.",
          };
        } else {
          await client.userPost.update({
            where: {
              id: userPostId,
            },
            data: {
              deleted: true,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
