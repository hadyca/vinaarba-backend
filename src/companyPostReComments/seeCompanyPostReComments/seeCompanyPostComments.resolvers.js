import client from "../../client";

export default {
  Query: {
    seeCompanyPostReComments: (_, { companyPostCommentId }) =>
      client.companyPostReComment.findMany({
        where: { companyPostCommentId },
        include: { user: true },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
