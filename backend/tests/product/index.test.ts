import "jest";
import request from "supertest";
import { DataSource } from "typeorm";
import { ServerBootstrap } from "../../src/server";
const server = new ServerBootstrap();
let accessToken: string | null = null;
let conn: DataSource | null = null;
let productID = ""
let product:any = {}
let labID = ""
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
  const labResponse = await request(server.app)
  .get("/api/laboratories")
  .set("Authorization", `Bearer ${accessToken}`)
  .send();
  labID = labResponse.body.data[0].id
  product =  {
    "name":"producto #50",
    "stock":50,
    "price":60,
    // "expiration_date":1658627826760,
    "expiration_date":"2022-11-29 22:13:06",
    "therapeutic_description":"Desc #50",
    "laboratory":labID
  }
});

afterAll(async () => {
  await conn?.query("DELETE FROM product WHERE id='"+productID+"'")
  await conn?.destroy();
  server.server.close();
});

describe('Test para el modulo de product', () => {
  test('CP03-HU03  Registrar Producto', async () => {
    const response = await request(server.app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(product);
    // console.log(response.body)
    expect(response.statusCode).toBe(200);
    productID = response.body.data.id
  })
  test('CP03-HU03  Editar Producto', async () => {
    const response = await request(server.app)
      .put("/api/products/update/"+productID)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        ...product,
        name : "Producto para acabar y destruir con el mal del mundo"
      });
    expect(response.statusCode).toBe(200);
  })
})