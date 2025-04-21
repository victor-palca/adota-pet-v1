import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerPet } from "./register";
import { getPetDetail } from "./get-pet-detail";

export function routePet(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, registerPet)
  app.get('/pet/:id', getPetDetail)
}