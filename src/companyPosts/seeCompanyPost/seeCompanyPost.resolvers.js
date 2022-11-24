import client from "../../client";

export default {
  Query: {
    seeCompanyPost: async (_, { companyPostId }) => {
      try {
        const post = await client.companyPost.findUnique({
          where: {
            id: companyPostId,
          },
        });

        if (!post || post.deleted) {
          throw new Error("100");
        } else {
          return post;
        }
      } catch (error) {
        return error;
      }
    },
  },
};
