import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByCityService } from '@/services/pets/get-pet-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramSchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
  })

  const { city, page } = paramSchema.parse(request.params)

  try {
    const prismaPetsRepository = new PrismaPetRepository()
    const getPetByCityService = new GetPetByCityService(prismaPetsRepository)

    const { pets } = await getPetByCityService.execute({ city, page })

    reply.status(200).send({
      pets,
    })
  } catch (error) {
    return reply.status(500).send({ message: `${error}` })
  }
}
