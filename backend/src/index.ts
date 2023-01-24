import { ServerBootstrap } from "./server";

(async ()=>{
  const server = new ServerBootstrap()
  server.config()
  await server.upServer()
})();
