import client from "../../client";

export default {
  Query: {
    seeCompanyPostByDistrict: (
      _,
      {
        addressStep1_1,
        addressStep1_2,
        addressStep1_3,
        addressStep1_4,
        addressStep1_5,
        addressStep2_1,
        addressStep2_2,
        addressStep2_3,
        addressStep2_4,
        addressStep2_5,
        offset,
      }
    ) =>
      client.companyPost.findMany({
        where: {
          OR: [
            {
              company: {
                addressStep1: addressStep1_1,
              },
            },
            {
              company: {
                addressStep1: addressStep1_2,
              },
            },
            {
              company: {
                addressStep1: addressStep1_3,
              },
            },
            {
              company: {
                addressStep1: addressStep1_4,
              },
            },
            {
              company: {
                addressStep1: addressStep1_5,
              },
            },
            {
              company: {
                addressStep2: addressStep2_1,
              },
            },
            {
              company: {
                addressStep2: addressStep2_2,
              },
            },
            {
              company: {
                addressStep2: addressStep2_3,
              },
            },
            {
              company: {
                addressStep2: addressStep2_4,
              },
            },
            {
              company: {
                addressStep2: addressStep2_5,
              },
            },
          ],
          NOT: {
            deleted: true,
          },
        },

        take: 5,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
