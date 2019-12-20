const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("POST /api/auth/", () => {
  it("has process.env.DB_ENV as testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("gets token on correct login credentials", () => {
    //Register user
    // await db("users").insert({ username: "test1", password: "password" });
    //Login user
    return request(server)
      .post("/api/auth/login")
      .send({ username: "test1", password: "password" })
      .then(res => {
        const token = res.body.token;
        expect(token).not.toBeUndefined();
      });
  });

  it("does not get token on invalid credentials", () => {
    return request(server)
      .post("/api/auth/login")
      .send({ username: "test2", password: "invalid password" })
      .then(res => {
        const token = res.body.token;
        expect(token).toBeUndefined();
      });
  });

  it("registers correctly", async () => {
    //Remove user from db to re-register
    await db("users")
      .where({ username: "regtest" })
      .del();
    return request(server)
      .post("/api/auth/register")
      .send({ username: "regtest", password: "password" })
      .then(res => {
        const id = res.body.id;
        const username = res.body.username;
        expect(id).not.toBeUndefined();
        expect(username).not.toBeUndefined();
      });
  });

  it("does not register on invalid credentials", () => {
    return request(server)
      .post("/api/auth/reigster")
      .send({ username: "hello" })
      .then(res => {
        const { id, username } = res.body;
        expect(id).toBeUndefined();
        expect(username).toBeUndefined();
      });
  });
});
