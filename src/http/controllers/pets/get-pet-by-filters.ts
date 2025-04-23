import { AnimalSex } from '@/@types/animal-sex'
import { AnimalType } from '@/@types/animal-type'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByFilterService } from '@/services/pets/get-pet-by-filter'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPetByFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const queryParams = z.object({
    city: z.string(),
    page: z.coerce.number(),
    age: z.coerce.number().optional(),
    animalSex: z.nativeEnum(AnimalSex).optional(),
    type: z.nativeEnum(AnimalType).optional(),
    isFixed: z.coerce.boolean().optional(),
  })

  const { city, page, age, animalSex, type, isFixed } = queryParams.parse(
    request.query,
  )

  try {
    const prismaPetsRepository = new PrismaPetRepository()
    const getPetByFiltersService = new GetPetByFilterService(
      prismaPetsRepository,
    )

    const { pets } = await getPetByFiltersService.execute({
      city,
      page,
      age,
      animalSex,
      type,
      isFixed,
    })

    reply.status(200).send({
      pets,
    })
  } catch (error) {
    reply.status(500).send({ message: 'Internal Server Error' })
  }
}
