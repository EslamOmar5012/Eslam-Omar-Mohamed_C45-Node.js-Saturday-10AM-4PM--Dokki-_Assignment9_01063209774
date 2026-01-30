export const successRes = (res, code, message, data) => {
  return res.status(code).json({ status: "success", message, data });
};
