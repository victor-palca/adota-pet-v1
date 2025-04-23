import { AnimalSex } from '@/@types/animal-sex'
import { AnimalType } from '@/@types/animal-type'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '@/services/pets/create-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petSchema = z.object({
    name: z.string(),
    age: z.coerce.number().int().default(0),
    isFixed: z.coerce.boolean().default(false),
    description: z.string().nullable(),
    animalSex: z.nativeEnum(AnimalSex),
    type: z.nativeEnum(AnimalType),
  })

  const { name, age, isFixed, description, animalSex, type } =
    await petSchema.parse(request.body)
  const orgId = request.user.sub

  const prismaPetRepository = new PrismaPetRepository()
  const registerPetService = new CreatePetService(prismaPetRepository)

  try {
    await registerPetService.execute({
      type,
      name,
      age,
      isFixed,
      description: description ?? undefined,
      animalSex,
      orgId,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(500).send({ message: `${error}` })
  }
}
