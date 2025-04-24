import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Register Org E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('ít should be able to register', async () => {
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
})
