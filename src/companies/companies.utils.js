import client from "../client";

export const getUserCompany = async (userId) => {
  const company = await client.company.findUnique({
    where: { userId },
  });
  return company;
};
