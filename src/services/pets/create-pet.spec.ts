import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreatePetService } from './create-pet'
import { AnimalType, GenderType } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetService
describe('Create Pet', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetService(petsRepository)
  })

  it('Should be able to create a org', async () => {
    const { pet } = await sut.execute({
      type: AnimalType.CACHORRO,
      name: 'Pet 1',
      age: 1,
      isFixed: false,
      description: '',
      gender: GenderType.MACHO,
      orgId: 'org1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
