import { FastifyInstance } from "fastify";
import { registerOrg } from "./register";
import { authenticate } from "./authenticate";

export async function OrgsRoutes(app: FastifyInstance) {
  app.post('/org', registerOrg)
  app.post('/session', authenticate)
}