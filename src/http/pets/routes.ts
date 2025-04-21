import { FastifyInstance } from "fastify";
import { registerPet } from "./register";

export function routePet(app: FastifyInstance) {
  app.post('/pet', registerPet)
}