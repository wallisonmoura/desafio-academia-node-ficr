const middlewareNotFound = (req, res, next) => {
  res.status(404).json({ msg: "Not Found page!" });
};

module.exports = middlewareNotFound;
