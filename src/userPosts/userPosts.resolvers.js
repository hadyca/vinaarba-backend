import client from "../client";

export default {
  UserPost: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: { id: userId },
      });
    },
    userPostComments: ({ id }) => {
      return client.userPostComment.findMany({
        where: { userPostId: id },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
    file: ({ id }) => {
      return client.file.findMany({
        where: {
          userPostId: id,
        },
      });
    },
    totalUserPostLikes: ({ id }) => {
      return client.userPostLike.count({ where: { userPostId: id } });
    },

    totalUserPostComments: async ({ id }) => {
      const PostComment = await client.userPostComment.count({
        where: {
          userPostId: id,
        },
      });

      const reCommentArry = await client.userPostComment.findMany({
        where: { userPostId: id },
        select: {
          _count: {
            select: { userPostReComments: true },
          },
        },
      });

      const reComment = reCommentArry.reduce((prev, cur) => {
        return (prev += cur._count.userPostReComments);
      }, 0);

      return PostComment + reComment;
    },

    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isFavorite: async ({ id }, _, { loggedInUser }) => {
      const exists = await client.user.count({
        where: {
          id: loggedInUser.id,
          favoriteUserPosts: { some: { id } },
        },
      });
      return Boolean(exists);
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.userPostLike.findUnique({
        where: {
          userId_userPostId: {
            userPostId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },
};
