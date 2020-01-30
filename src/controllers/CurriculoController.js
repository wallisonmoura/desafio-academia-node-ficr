const ServiceGithub = require("../services/github");
const ServiceFacebook = require("../services/facebook");
const Dados = require("../models/dados");

class CurriculoController {
  async get(req, res, next) {
    try {
      const ApiFace = await ServiceFacebook.get(
        `/me?fields=id%2Cname%2Cbirthday%2Clocation%2Cgender&access_token=${process.env.FACEBOOK_TOKEN}`
      );
      const ApiGitUser = await ServiceGithub.request("/user");
      const ApiGitRep = await ServiceGithub.request("/user/repos");

      const { name: login, birthday, location, email, gender } = ApiFace.data;
      const { bio, avatar_url, html_url } = ApiGitUser.data;
      //const result = ApiGitRep.map(obj => {

      //})

      //const { size, name: nome, url } = ApiGitRep.data;

      const profile = {
        facebook: {
          nome: login,
          data_nascimento: birthday,
          endereço: location.name,
          genero: gender,
          email: email,
          bio: bio,
          foto: avatar_url,
          formacao: Dados.formacao,
          experiencia_profissional: Dados.experiencia_profissional
        },
        github: {
          perfil: html_url,
          alguns_repositorios: {
            ApiGitRep
          }
        }
      };
      return res.json(profile);
    } catch (error) {
      console.error("Problemas com a aplicação");
      return next(error);
    }
  }
}

module.exports = new CurriculoController();
