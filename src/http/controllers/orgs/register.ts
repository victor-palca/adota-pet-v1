import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgService } from '@/services/orgs/create-org'
import { OrgAlreadyExistsError } from '@/services/erros/org-already-exists-error'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cnpj: z.string(),
    description: z.string().optional(),
    phone: z.string(),
    city: z.string(),
    state: z.string(),
  })

  const { name, email, password, cnpj, description, phone, city, state } =
    requestSchema.parse(request.body)

  try {
    const prismaOrgRepository = new PrismaOrgsRepository()
    const service = new CreateOrgService(prismaOrgRepository)

    await service.execute({
      name,
      email,
      password,
      cnpj,
      description,
      phone,
      city,
      state,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
