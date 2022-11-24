import client from "../client";

export default {
  CompanyPostComment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    companyPostReComments: ({ id }) => {
      return client.companyPostReComment.findMany({
        where: { companyPostCommentId: id },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  },
};
