import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { deleteFile, uploadToS3 } from "../../shared/shared.utils";
import { betweenDay } from "../users.utils";

const resolverFn = async (
  _,
  {
    username: newUsername,
    usernameEditDate: newUsernameEditDate,
    password: newPassword,
    bio,
    avatarUrl,
  },
  { loggedInUser }
) => {
  console.log(avatarUrl);
  try {
    const existingUser = await client.user.findUnique({
      where: {
        id: loggedInUser.id,
      },
    });
    let awsFileUrl = null;
    if (avatarUrl) {
      if (existingUser.avatarKey) {
        await deleteFile(existingUser.avatarKey);
      }
      awsFileUrl = await uploadToS3(avatarUrl, loggedInUser.id, "avatar");
    }

    let uglyPassword = null;
    if (newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    if (newUsernameEditDate) {
      const betweenDays = betweenDay(
        parseInt(newUsernameEditDate),
        parseInt(existingUser.usernameEditDate)
      );
      if (betweenDays < 30) {
        throw new Error("100");
      }
    }
    if (newUsername) {
      const existingUsername = await client.user.findFirst({
        where: {
          username: newUsername,
        },
      });
      if (existingUsername) {
        throw new Error("200");
      }
    }

    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        ...(newUsername && { username: newUsername }),
        ...(newUsernameEditDate && { usernameEditDate: newUsernameEditDate }),
        bio,
        ...(uglyPassword && { password: uglyPassword }),
        ...(awsFileUrl && {
          avatarUrl: awsFileUrl.Location,
          avatarKey: awsFileUrl.Key,
        }),
      },
    });
    return updatedUser;
  } catch (error) {
    return error;
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
