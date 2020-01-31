const Octokit = require("@octokit/rest");
const gitToken = require("../config/github");

const octokit = new Octokit({
    auth: gitToken
});

module.exports = octokit;
