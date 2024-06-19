export const sessionChecker = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "No autorizado." });
  }
};
