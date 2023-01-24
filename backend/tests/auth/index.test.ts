import "jest";
import request from "supertest";
import { DataSource } from "typeorm";
import { ServerBootstrap } from "../../src/server";
const server = new ServerBootstrap();
let conn: DataSource | null = null;
beforeAll(async () => {
  server.config();
  conn = (await server.dbConnect()) as DataSource;
});

afterAll(async () => {
  await conn?.destroy();
  server.server.close();
});

describe('Test en la Authentication', () => {
  test('CP01-HU01 Autenticar usuario en el sistema', async () => {
    const response = await request(server.app)
    .post("/api/login")
    .send({
      username: "thomtwd",
      password: "123456",
    })
    .expect(200);
    expect(response.body.accessToken).toBeTruthy()
    expect(typeof response.body.accessToken).toBe('string');
    expect(response.body.ok).toBeTruthy()
    expect(response.body.employee).not.toBeUndefined()
  })
})