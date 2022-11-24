import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    toggleFavoriteUserPost: protectedResolver(
      async (_, { userPostId }, { loggedInUser }) => {
        try {
          const post = await client.userPost.findUnique({
            where: {
              id: userPostId,
            },
          });
          if (!post) {
            throw new Error("100");
          }
          const user = await client.user.findFirst({
            where: {
              id: loggedInUser.id,
              favoriteUserPosts: {
                some: { id: userPostId },
              },
            },
          });

          if (user) {
            await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                favoriteUserPosts: {
                  disconnect: {
                    id: userPostId,
                  },
                },
              },
            });
            return post;
          } else {
            await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                favoriteUserPosts: {
                  connect: {
                    id: userPostId,
                  },
                },
              },
            });
            return post;
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};
