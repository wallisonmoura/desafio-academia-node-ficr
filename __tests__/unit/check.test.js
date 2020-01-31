const app = require("../../src/app");
const request = require("supertest")(app);

describe("Check", () => {
    it("checks that all attributes are in the response", async () => {
        const result = await request.get("/").send();
        expect(result.status).toBe(404);
    });
});
