const { Router } = require("express");
const octokit = require("./services/github");
const github = require("./controllers/github");

const app = Router();

app.get("/api", async (req, res, next) => {
  try {
    const { data } = await octokit.request("/user");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
