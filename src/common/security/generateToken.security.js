import jwt from "jsonwebtoken";
import { jwtSercetKey } from "../../../config/index.js";

export const generateToken = (objectId, expireTime) => {
  const id = String(objectId);
  const token = jwt.sign({ _id: id }, jwtSercetKey, { expiresIn: expireTime });

  return token;
};
