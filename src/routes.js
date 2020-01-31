const { Router } = require("express");
const NotFound = require("./middlewares/NotFound");
const Curriculo = require("./controllers/CurriculoController");
const Error = require("./helpers/ErrorHelper");

const app = Router();

app.get("/api/curriculo", Curriculo.get);
app.use(NotFound);

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  Error(err, res);
});

module.exports = app;
