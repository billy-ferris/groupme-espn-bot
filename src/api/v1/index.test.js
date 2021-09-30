const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

describe("GET /", () => {
  it("responds with a json message", async () => {
    const response = await request.get("/api/v1");

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("/api/v1");
  });

  it("responds with a not found message", async () => {
    const response = await request
      .get("/api/v1/not-found")
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.type).toEqual("application/json");
  });
});
