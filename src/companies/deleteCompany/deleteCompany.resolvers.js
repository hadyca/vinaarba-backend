import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCompany: protectedResolver(
      async (_, { companyId }, { loggedInUser }) => {
        try {
          const existingCompany = await client.company.findUnique({
            where: {
              id: companyId,
            },
          });
          if (!existingCompany) {
            return {
              ok: false,
              error: "존재 하지 않는 회사입니다.",
            };
          }
          if (existingCompany.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "본인 계정이 아닙니다.",
            };
          } else {
            await client.company.delete({
              where: {
                id: companyId,
              },
            });
            return {
              ok: true,
              id: existingCompany.id,
            };
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};
