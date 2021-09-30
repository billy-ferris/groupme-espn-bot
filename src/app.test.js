const supertest = require("supertest");
const app = require("./app");

const request = supertest(app);

describe("GET /", () => {
  it("responds with a json message", async () => {
    const response = await request.get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("/");
  });

  it("responds with a not found message", async () => {
    const response = await request
      .get("/not-found")
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.type).toEqual("application/json");
  });
});
