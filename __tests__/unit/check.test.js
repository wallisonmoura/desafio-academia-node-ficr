const app = require("../../src/app");
const request = require("supertest")(app);

describe("inicio dos testes", () => {
    it("acessa a rota da home e verifica o conteúdo que é exibido", async () => {
        const response = await request.get("/");
        expect(response.status).toBe(404);
    });
});
