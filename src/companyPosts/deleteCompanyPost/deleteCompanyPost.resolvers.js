import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { getUserCompany } from "../../companies/companies.utils";

export default {
  Mutation: {
    deleteCompanyPost: protectedResolver(
      async (_, { companyPostId }, { loggedInUser }) => {
        const userCompany = await getUserCompany(loggedInUser.id);
        const oldPost = await client.companyPost.findFirst({
          where: {
            id: companyPostId,
            companyId: userCompany.id,
          },
        });
        if (!oldPost) {
          return {
            ok: false,
            error: "게시글을 찾을 수 없거나, 권한이 없습니다.",
          };
        } else if (oldPost.companyId !== userCompany.id) {
          return {
            ok: false,
            error: "권한이 없습니다.",
          };
        } else {
          await client.companyPost.update({
            where: {
              id: companyPostId,
            },
            data: {
              deleted: true,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
