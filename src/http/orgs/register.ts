import { prisma } from "@/database/prisma";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
  
  const validateRequestBody = await requestSchema.safeParse(request.body);

  if (validateRequestBody.success === false) {
    return reply.status(400).send({ message: 'Validation error', issues:  validateRequestBody.error.format()})
  }


  const { name, email, password, cnpj, description, phone, city, state } = request.body as Org
  
  try {
    const orgAlreadyExists = await prisma.org.findFirst({
      where: {
        OR: [
          { email },
          { phone },
          { cnpj },
        ]
      }
    })

    if (orgAlreadyExists) {
      return reply.status(400).send({ message: 'Org Already Exists'})
    }

    await prisma.org.create({
      data: {
        id: randomUUID(),
        password_hash: await hash(password, 6),
        name,
        email,
        cnpj,
        description,
        phone,
        city,
        state
      }
    })
    
    return reply.status(201).send()
  } catch (error) {
    return reply.status(500).send({ message: 'Internal Server Error', issues:  error})
  }
}