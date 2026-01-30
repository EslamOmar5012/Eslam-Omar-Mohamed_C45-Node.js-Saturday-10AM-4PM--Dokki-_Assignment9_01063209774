import { hash } from "bcrypt";
import { saltRound } from "../../../config/index.js";

const hashPassword = async (rawPassword) => {
  const hashedPassword = await hash(rawPassword, Number(saltRound));

  return hashedPassword;
};

export { hashPassword };
