import "jest";
import request from "supertest";
import { ServerBootstrap } from "../../src/server";
import { DataSource } from "typeorm";
const server = new ServerBootstrap();
let accessToken: string | null = null;
let conn: DataSource | null = null;
let number = 0;
let laboratory:any = {};
let laboratoriId:null|string = null

const clear = async () => {
  await conn?.query("DELETE FROM laboratory WHERE id='"+laboratoriId+"'")
}

beforeAll(async () => {
  number = Math.random();
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
  laboratory = {
    name: "Laboratorio Informal para el suero del super soldado #" + number,
    description: "HailHydra #" + number,
    address: "Los legados - Lima Peru #" + number,
    lng: number * 100,
    lat: number * 100,
  };
});

afterAll(async () => {
  await clear()
  await conn?.destroy();
  server.server.close();
});

describe("Test al modulo laboratory", () => {
  test("CP06-HU06  Productos Más Solicitados", async () => {
    const response = await request(server.app)
      .get("/api/products/most-selled")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array)
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.statusMsg).toBe("success")
  });

  test("CP08-HU08  Registra Laboratorio", async () => {
    // console.log("me ejecute primero 2")
    const response = await request(server.app)
      .post("/api/laboratories/create")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(laboratory);
    laboratoriId = response.body.data.id
    expect(response.statusCode).toBe(200);
    expect(response.body.statusMsg).toBe("success");
    expect(response.body.data).not.toBeUndefined()
    expect(response.body.data.name).toBe(laboratory.name)
    
  });

  test("CP09-HU09  Listar laboratorios", async () => {
    const response = await request(server.app)
      .get("/api/laboratories")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    const match = response.body.data.filter((lb:any)=>(lb.name == laboratory.name && lb.address == laboratory.address))[0]
    expect(match).toBeTruthy()
  });
});
