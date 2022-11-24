import client from "../../client";
import { getUserCompany } from "../companies.utils";
import { protectedResolver } from "../../users/users.utils";

const resolverFn = async (
  _,
  {
    companyName: newCompanyName,
    aboutUs: newAboutUs,
    totalEmployees: newTotalEmployees,
    email: newEmail,
    contactNumber: newContactNumber,
    addressStep1: newAddressStep1,
    addressStep2: newAddressStep2,
    addressStep3: newAddressStep3,
  },
  { loggedInUser }
) => {
  const userCompany = await getUserCompany(loggedInUser.id);
  const updatedCompany = await client.company.update({
    where: { id: userCompany.id },
    data: {
      ...(newCompanyName && { companyName: newCompanyName }),
      ...(newAboutUs && { aboutUs: newAboutUs }),
      ...(newTotalEmployees >= 0 && { totalEmployees: newTotalEmployees }),
      ...(newEmail && { email: newEmail }),
      ...(newContactNumber && { contactNumber: newContactNumber }),
      ...(newAddressStep1 && { addressStep1: newAddressStep1 }),
      ...(newAddressStep2 && { addressStep2: newAddressStep2 }),
      ...(newAddressStep3 && { addressStep3: newAddressStep3 }),
    },
  });
  if (updatedCompany.id) {
    return updatedCompany;
  } else {
    throw new Error("회사 정보를 업데이트 할 수 없습니다.");
  }
};

export default {
  Mutation: {
    editCompany: protectedResolver(resolverFn),
  },
};
