import client from "../../client";

export default {
  Query: {
    seeCompanyPostComment: async (_, { companyPostCommentId }) => {
      try {
        const existingComment = await client.companyPostComment.findUnique({
          where: { id: companyPostCommentId },
          include: { user: true },
        });
        if (!existingComment) {
          throw new Error("100");
        } else {
          return existingComment;
        }
      } catch (error) {
        return error;
      }
    },
  },
};
