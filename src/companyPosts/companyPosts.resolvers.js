import client from "../client";

export default {
  CompanyPost: {
    company: ({ companyId }) => {
      return client.company.findUnique({
        where: { id: companyId },
      });
    },
    workingDay: ({ id }) => {
      return client.workingDay.findUnique({
        where: {
          id,
        },
      });
    },
    companyPostComments: ({ id }) => {
      return client.companyPostComment.findMany({
        where: { companyPostId: id },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
    file: ({ id }) => {
      return client.file.findMany({
        where: {
          companyPostId: id,
        },
      });
    },
    totalCompanyPostLikes: ({ id }) => {
      return client.companyPostLike.count({ where: { companyPostId: id } });
    },
    totalCompanyPostComments: async ({ id }) => {
      const PostComment = await client.companyPostComment.count({
        where: {
          companyPostId: id,
        },
      });

      const reCommentArry = await client.companyPostComment.findMany({
        where: { companyPostId: id },
        select: {
          _count: {
            select: { companyPostReComments: true },
          },
        },
      });

      const reComment = reCommentArry.reduce((prev, cur) => {
        return (prev += cur._count.companyPostReComments);
      }, 0);

      return PostComment + reComment;
    },
    isMine: async ({ companyId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const getUser = await client.company.findUnique({
        where: {
          id: companyId,
        },
      });

      return getUser.userId === loggedInUser.id;
    },
    isFavorite: async ({ id }, _, { loggedInUser }) => {
      const exists = await client.user.count({
        where: {
          id: loggedInUser.id,
          favoriteCompanyPosts: { some: { id } },
        },
      });
      return Boolean(exists);
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.companyPostLike.findUnique({
        where: {
          userId_companyPostId: {
            companyPostId: id,
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
