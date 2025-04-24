import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { prisma } from '@/database/prisma'

describe('Get Pet Detail by ID E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet detail by id', async () => {
    const { orgId } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Pet 1',
        age: 2,
        isFixed: true,
        description: '',
        gender: 'MACHO',
        type: 'GATO',
        org_id: orgId,
      },
    })

    const response = await request(app.server).get(`/pet/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: expect.any(String),
        type: expect.any(String),
      }),
    })
  })
})
