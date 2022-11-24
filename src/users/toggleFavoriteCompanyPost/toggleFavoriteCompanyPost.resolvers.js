import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    toggleFavoriteCompanyPost: protectedResolver(
      async (_, { companyPostId }, { loggedInUser }) => {
        try {
          const post = await client.companyPost.findUnique({
            where: {
              id: companyPostId,
            },
          });
          if (!post) {
            throw new Error("100");
          }
          const user = await client.user.findFirst({
            where: {
              id: loggedInUser.id,
              favoriteCompanyPosts: {
                some: { id: companyPostId },
              },
            },
          });

          if (user) {
            await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                favoriteCompanyPosts: {
                  disconnect: {
                    id: companyPostId,
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
                favoriteCompanyPosts: {
                  connect: {
                    id: companyPostId,
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
