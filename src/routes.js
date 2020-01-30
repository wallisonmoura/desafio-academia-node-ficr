const { Router } = require("express");
const NotFound = require("./middlewares/NotFound");
const curriculo = require("./controllers/CurriculoController");
//const octokit = require("./services/github");

const app = Router();

//app.get("/api", githubController.getCurriculo);

// app.get("/api", async (req, res, next) => {
//   try {
//     const { data } = await octokit.request("/user");
//     res.json(data);
//   } catch (error) {
//     next(console.error("Deu pau!"));
//   }
// });

app.get("/api/curriculo", curriculo.get);
app.use(NotFound);

module.exports = app;
