import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetDetailService } from './get-detail'
import { ResourceNotFoundError } from '../erros/resource-not-found'
import { AnimalType } from '@/@types/animal-type'
import { GenderType } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetDetailService
describe('Get Detail Pet', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetDetailService(petsRepository)
  })

  it('Should be able to find pet by id', async () => {
    const newPet = await petsRepository.create({
      type: AnimalType.CACHORRO,
      name: 'Pet 1',
      age: 1,
      isFixed: false,
      description: '',
      gender: GenderType.MACHO,
      org_id: 'org1',
    })

    const { pet } = await sut.execute({
      id: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should be able to not find a pet by id with wrong id', async () => {
    await petsRepository.create({
      type: AnimalType.CACHORRO,
      name: 'Pet 1',
      age: 1,
      isFixed: false,
      description: '',
      gender: GenderType.MACHO,
      org_id: 'org1',
    })

    await expect(() =>
      sut.execute({
        id: 'teste',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
