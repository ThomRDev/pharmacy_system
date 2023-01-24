import "jest";
import request from "supertest";
import { ServerBootstrap } from "../../src/server";
import { DataSource } from "typeorm";
const server = new ServerBootstrap();
let accessToken: string | null = null;
let conn: DataSource | null = null;

beforeAll(async () => {
  server.config();
  conn = (await server.dbConnect()) as DataSource;
  const response = await request(server.app)
    .post("/api/login")
    .send({
      username: "thomtwd",
      password: "123456",
    })
    .expect(200);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await conn?.destroy();
  server.server.close();
});

describe("Test al modulo de Empleados", () => {
  test("CP06-HU06 Listar empleados", async () => {
    const response = await request(server.app)
      .get("/api/employees")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array)
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.statusMsg).toBe("success")
  });
});
