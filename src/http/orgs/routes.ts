import { FastifyInstance } from "fastify";
import { registerOrg } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function OrgsRoutes(app: FastifyInstance) {
  app.post('/org', registerOrg)
  app.post('/session', authenticate)
  app.post('/token/refresh', refresh)
}