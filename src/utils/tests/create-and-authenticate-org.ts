import { prisma } from '@/database/prisma'
import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cnpj: '123456789',
      description: '',
      phone: '123456',
      city: 'Taubate',
      state: 'SP',
    },
  })

  const response = await request(app.server).post('/session').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = response.body

  return {
    token,
    orgId: org.id,
  }
}
