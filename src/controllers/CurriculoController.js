const ServiceGithub = require("../services/github");
const ServiceFacebook = require("../services/facebook");
//const ComplementoCurriculo = require("../../curriculo.json");

class CurriculoController {
  async read(req, res, next) {
    try {
      const { data } = await ServiceFacebook.get(
        `/me?fields=id%2Cname%2Cbirthday%2Clocation%2Cgender&access_token=${process.env.FACEBOOK_TOKEN}`
      );
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new CurriculoController();
