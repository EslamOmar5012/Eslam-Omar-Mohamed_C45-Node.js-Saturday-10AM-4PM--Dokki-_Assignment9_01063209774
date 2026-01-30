import jwt from "jsonwebtoken";
import { jwtSercetKey } from "../../../config/index.js";
import ApiError from "../utils/ApiError.utils.js";

export const decryptToken = (token) => {
  //check if there is token or not
  if (!token) throw new ApiError("there is not any user signed in");

  //dycrypt token
  const decoded = jwt.verify(token, jwtSercetKey);

  //send only user id
  return decoded._id;
};
