import { AnimalSex } from "@/@types/animal-sex";
import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePet } from "@/services/pets/create-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
  const petSchema = z.object({
    name: z.string(),
    age: z.number().default(0),
    isFixed: z.boolean().default(false),
    description: z.string().nullable(),
    animalSex: z.nativeEnum(AnimalSex)
  })

  const {name, age, isFixed, description, animalSex} = await petSchema.parse(request.body)
  const orgId = request.user.sub

  const prismaPetRepository = new PrismaPetRepository()
  const registerPetService = new CreatePet(prismaPetRepository)

  await registerPetService.execute({
    name,
    age,
    isFixed,
    description: description ?? undefined,
    animalSex,
    orgId,
   })

   return reply.status(201)
}