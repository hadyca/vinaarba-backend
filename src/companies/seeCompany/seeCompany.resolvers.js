import client from "../../client";

export default {
  Query: {
    seeCompany: (_, { companyId }) =>
      client.company.findUnique({
        where: { id: companyId },
      }),
  },
};
