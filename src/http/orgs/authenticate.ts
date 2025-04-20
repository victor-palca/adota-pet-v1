import { prisma } from "@/database/prisma";
import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string(),
    password: z.string()
  })
  
  const _bodySchema = bodySchema.safeParse(request.body)

  if (_bodySchema.success === false) {
    return reply.status(400).send({ message: 'Validation error', issues:  _bodySchema.error.format()})
  }

  try {
    const { email, password } = request.body
    const org = await prisma.org.findFirst({
      where: {
        email
      }
    })

    if (!org) {
      return reply.status(400).send({ message: 'Invalid credentials'})
    }

    const doesPasswordMathes = await compare(password, org.password_hash)

    if (!doesPasswordMathes) {
      return reply.status(400).send({ message: 'Invalid credentials'})
    }

    delete org.password_hash
    
    return reply.status(200).send({
      org
    })
  } catch (error) {
    
  }
}