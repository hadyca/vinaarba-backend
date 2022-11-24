import client from "../client";

export default {
  UserPostComment: {
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
    userPostReComments: ({ id }) => {
      return client.userPostReComment.findMany({
        where: { userPostCommentId: id },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  },
};
