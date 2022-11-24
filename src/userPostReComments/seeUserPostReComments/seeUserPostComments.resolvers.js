import client from "../../client";

export default {
  Query: {
    seeUserPostReComments: (_, { userPostCommentId }) =>
      client.userPostReComment.findMany({
        where: { userPostCommentId },
        include: { user: true },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
