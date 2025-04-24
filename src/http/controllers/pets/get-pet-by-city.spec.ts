import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { prisma } from '@/database/prisma'

describe('Get Pet list by city E2E', () => {
  beforeAll(async () => {
    await app.ready()

    const { orgId } = await createAndAuthenticateOrg(app)

    for (let i = 0; i < 15; i++) {
      await prisma.pet.create({
        data: {
          type: i % 2 ? 'CACHORRO' : 'GATO',
          name: `Pet ${i}`,
          age: 5,
          isFixed: i % 3 ? true : false,
          description: '',
          gender: i % 2 ? 'MACHO' : 'FEMEA',
          org_id: orgId,
        },
      })
    }
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet list by city', async () => {
    const response = await request(app.server).get(`/pet/city/Taubate/1`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(10)
  })

  it('should be able to get a paginated list of pet details by city', async () => {
    const response = await request(app.server).get(`/pet/city/Taubate/2`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(5)
  })
})
