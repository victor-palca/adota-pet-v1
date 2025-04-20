import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/erros/invalid-credentials";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string(),
    password: z.string()
  })

  const {email, password} = bodySchema.parse(request.body)

  try {
    const prismaOrgRepository = new PrismaOrgsRepository() 
    const authenticateService = new AuthenticateService(prismaOrgRepository)

    const org = await authenticateService.execute({email, password})

    return reply.status(200).send({
      org
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({message: `${error}`})
    }
  }
}