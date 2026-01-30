import { UserModel } from "../../db/index.js";

export const checkIfUserExist = async (email) => {
  const user = await UserModel.findOne({ email });

  if (user) throw new Error("Email already exists");
};
