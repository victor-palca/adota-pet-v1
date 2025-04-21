import { FastifyInstance } from "fastify";
import { registerPet } from "./register";
import { verifyJWT } from "../middlewares/verify-jwt";

export function routePet(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, registerPet)
}