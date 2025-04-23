import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create-pet'
import { AnimalSex } from '@/@types/animal-sex'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetService
describe('Create Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(petsRepository)
  })

  it('Should be able to create a org', async () => {
    const { pet } = await sut.execute({
      name: 'Pet 1',
      age: 1,
      isFixed: false,
      description: '',
      animalSex: AnimalSex.MACHO,
      orgId: 'org1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
