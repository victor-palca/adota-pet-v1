import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/database/prisma'

describe('Register Org E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cnpj: '123456789',
      description: '',
      phone: '123456',
      city: 'Taubate',
      state: 'SP',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register a org with same email', async () => {
    await prisma.org.create({
      data: {
        name: 'John Doe',
        email: 'johndoe1@example.com',
        password_hash: '123456',
        cnpj: '1234567839',
        description: '',
        phone: '1233456',
        city: 'Taubate',
        state: 'SP',
      },
    })

    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndoe1@example.com',
      password: '123456',
      cnpj: '123456789',
      description: '',
      phone: '1234536',
      city: 'Taubate',
      state: 'SP',
    })

    expect(response.status).toBe(409)
  })

  it('should not be able to register a org with same cnpj', async () => {
    await prisma.org.create({
      data: {
        name: 'John Doe',
        email: 'johndoe2@example.com',
        password_hash: '123456',
        cnpj: '123',
        description: '',
        phone: '123342256',
        city: 'Taubate',
        state: 'SP',
      },
    })

    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndoe3@example.com',
      password: '123456',
      cnpj: '123',
      description: '',
      phone: '1234444536',
      city: 'Taubate',
      state: 'SP',
    })

    expect(response.status).toBe(409)
  })

  it('should not be able to register a org with same phone', async () => {
    await prisma.org.create({
      data: {
        name: 'John Doe',
        email: 'johndoe5@example.com',
        password_hash: '123456',
        cnpj: '123445',
        description: '',
        phone: '123444453687',
        city: 'Taubate',
        state: 'SP',
      },
    })

    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndoe6@example.com',
      password: '123456',
      cnpj: '12367',
      description: '',
      phone: '123444453687',
      city: 'Taubate',
      state: 'SP',
    })

    expect(response.status).toBe(409)
  })
})
