import { compare } from "bcrypt";

const comparePassword = async (inputPassword, hashedPassword) => {
  const matched = await compare(inputPassword, hashedPassword);

  return matched;
};

export { comparePassword };
