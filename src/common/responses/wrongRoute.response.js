export const wrongRouteRes = (req, res) => {
  return res.status(404).json({ message: "Wrong route" });
};
