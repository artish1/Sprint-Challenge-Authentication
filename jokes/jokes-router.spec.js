const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("Auth tests", () => {
  it("doesn't let us go through w/o auth", () => {
    return request(server)
      .get("/api/jokes/")
      .expect(400);
  });

  it("let's us go through w/ auth", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTc2ODYxOTYyLCJleHAiOjE1NzY4Nzk5NjJ9.LmKAo67S_pEWAi7aOzh_pKiYTb5wtSAXFWXGyIn2spw";
    return request(server)
      .get("/api/jokes/")
      .set("Authorization", token)
      .expect(200);
  });
});
