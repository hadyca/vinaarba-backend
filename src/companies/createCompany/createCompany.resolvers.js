import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCompany: protectedResolver(
      async (
        _,
        {
          companyName,
          email,
          aboutUs,
          contactNumber,
          addressStep1,
          addressStep2,
          addressStep3,
          totalEmployees,
        },
        { loggedInUser }
      ) => {
        try {
          const existingUser = await client.company.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (existingUser) {
            return {
              ok: false,
              error: "이미 가입된 계정입니다. 다시 확인해주세요.",
            };
          }
          const existingEmail = await client.company.findFirst({
            where: {
              email,
            },
          });
          if (existingEmail) {
            return {
              ok: false,
              error:
                "이미 사용 중인 이메일 주소가 있습니다. 다른 이메일 주소를 입력해주세요.",
            };
          }
          await client.company.create({
            data: {
              companyName,
              email,
              aboutUs,
              contactNumber,
              addressStep1,
              addressStep2,
              addressStep3,
              totalEmployees,
              userId: loggedInUser.id,
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};
