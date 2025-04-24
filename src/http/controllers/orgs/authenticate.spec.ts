import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Authenticate Org E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cnpj: '123456789',
      description: '',
      phone: '123456',
      city: 'Taubate',
      state: 'SP',
    })

    const response = await request(app.server).post('/session').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cnpj: '123456789',
      description: '',
      phone: '123456',
      city: 'Taubate',
      state: 'SP',
    })

    const response = await request(app.server).post('/session').send({
      email: 'johndoe@example.com',
      password: '12345688',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      message: expect.any(String),
    })
  })
})
