class ErrorHandle extends Error {
  constructor() {
    super();
    this.statuscode = this.statuscode;
    this.message = message;
  }
}
const errorHandle = (err, res) => {
  const { statuscode, message } = err;

  return res.status(statuscode).json({
    error: "error",
    statuscode,
    message
  });
};

module.exports = {
  ErrorHandle,
  errorHandle
};
