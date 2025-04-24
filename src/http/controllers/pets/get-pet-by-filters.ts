import { AnimalType } from '@/@types/animal-type'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByFilterService } from '@/services/pets/get-pet-by-filter'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { GenderType } from '@prisma/client'

export async function GetPetByFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const queryParams = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.coerce.number().optional(),
    gender: z.nativeEnum(GenderType).optional(),
    type: z.nativeEnum(AnimalType).optional(),
    isFixed: z.preprocess((val) => {
      if (val === 'false' || val === false || val === '0') return false
      if (val === 'true' || val === true || val === '1') return true
      return undefined
    }, z.boolean().optional()),
  })

  const { city, page, age, gender, type, isFixed } = queryParams.parse(
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
      gender,
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
