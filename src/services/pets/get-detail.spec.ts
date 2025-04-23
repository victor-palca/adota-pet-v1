import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AnimalSex } from '@/@types/animal-sex'
import { GetDetailService } from './get-detail-service'
import { ResourceNotFoundError } from '../erros/resource-not-found'

let petsRepository: InMemoryPetsRepository
let sut: GetDetailService
describe('Get Detail Pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetDetailService(petsRepository)
  })

  it('Should be able to find pet by id', async () => {
    const newPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      isFixed: false,
      description: '',
      animalSex: AnimalSex.MACHO,
      org_id: 'org1',
    })

    const { pet } = await sut.execute({
      id: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should be able to not find a pet by id with wrong id', async () => {
    const newPet = await petsRepository.create({
      name: 'Pet 1',
      age: 1,
      isFixed: false,
      description: '',
      animalSex: AnimalSex.MACHO,
      org_id: 'org1',
    })

    await expect(() =>
      sut.execute({
        id: 'teste',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
