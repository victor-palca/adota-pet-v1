import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";
import { GetDetailService } from "@/services/pets/get-detail-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetDetail(request: FastifyRequest, reply: FastifyReply) {
  const getPetParams = z.object({
    id: z.string()
  })

  const { id } = getPetParams.parse(request.params)
  
  try {
    const prismaPetRepository = new PrismaPetRepository()
    const getPetDetailService = new GetDetailService(prismaPetRepository)

    const pet = await getPetDetailService.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: `${error}`})
    }
    
    throw error
  }
}