import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Refresh token Org E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
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

    const cookies = response.get('Set-Cookie')

    const responseRefresh = await request(app.server)
      .post('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(responseRefresh.statusCode).toEqual(200)
    expect(responseRefresh.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
