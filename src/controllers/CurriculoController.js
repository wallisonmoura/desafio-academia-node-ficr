const ServiceGithub = require("../services/github");
const ServiceFacebook = require("../services/facebook");
const FaceToken = require("../config/facebook");
const Dados = require("../models/dados");

class CurriculoController {
  async get(req, res, next) {
    try {
      const ApiFace = await ServiceFacebook.get(
        `/me?fields=id%2Cname%2Cbirthday%2Clocation%2Cgender&access_token=${FaceToken}`
      );
      const ApiGitUser = await ServiceGithub.request("/user");
      const ApiGitRep = await ServiceGithub.request("/user/repos");

      const { name: login, birthday, location, email, gender } = ApiFace.data;
      const { bio, avatar_url, html_url } = ApiGitUser.data;

      const result = ApiGitRep.data.map(repo => {
        return {
          size: repo.size,
          name: repo.name,
          url: repo.url
        };
      });

      const orderRepo = result.splice(0, 3).sort((a, b) => {
        if (a.size < b.size) return 1;
        if (a.size > b.size) return -1;
        return 0;
      });

      const profile = {
        facebook: {
          nome: login,
          data_nascimento: birthday,
          endereço: location.name,
          genero: gender === "male" ? "masculino" : "feminino",
          email: email,
          bio: bio,
          foto: avatar_url,
          formacao: Dados.formacao,
          experiencia_profissional: Dados.experiencia_profissional
        },
        github: {
          perfil: html_url,
          alguns_repositorios: orderRepo
        }
      };
      return res.json(profile);
    } catch (error) {
      console.error("Problemas com a aplicação");
      return error;
    }
  }
}

module.exports = new CurriculoController();
