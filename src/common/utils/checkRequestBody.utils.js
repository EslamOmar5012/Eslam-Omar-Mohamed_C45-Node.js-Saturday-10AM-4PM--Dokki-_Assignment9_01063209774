import ApiError from "./ApiError.utils.js";

export const checkRequestBody = async (...body) => {
  for (const [key, value] of body) {
    if (!value) throw new ApiError(`property is missing ${key}`, 400);
  }
};
