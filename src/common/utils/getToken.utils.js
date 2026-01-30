import { decryptToken } from "../security/decryptToken.security.js";
import ApiError from "./ApiError.utils.js";

export const getToken = (req) => {
  const token = req.cookies.jwt;

  if (!token) throw new ApiError("there is no signed in user", 401);

  const id = decryptToken(token);

  return id;
};
