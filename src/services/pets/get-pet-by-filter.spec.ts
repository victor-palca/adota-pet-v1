import { beforeEach, describe, expect, it } from 'vitest'
import { Org } from '@prisma/client'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AnimalSex } from '@/@types/animal-sex'
import { AnimalType } from '@/@types/animal-type'
import { GetPetByFilterService } from './get-pet-by-filter'
import { afterEach } from 'node:test'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetByFilterService

let orgTaubate: Org
let orgSjc: Org

describe('Get Pet By Filters', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetByFilterService(petsRepository)

    orgTaubate = await orgsRepository.create({
      password_hash: '123456',
      name: 'Org 1',
      email: 'org1@teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Taubate',
      state: 'SP',
    })

    orgSjc = await orgsRepository.create({
      password_hash: '123456',
      name: 'Org 1',
      email: 'org1@teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Sao Jose dos Campos',
      state: 'SP',
    })
  })
  afterEach(async () => {
    petsRepository.pets = []
  })

  it('Should be able to find pets by filter city', async () => {
    for (let i = 0; i < 3; i++) {
      await petsRepository.create({
        type: AnimalType.CACHORRO,
        name: 'Pet 1',
        age: 1,
        isFixed: false,
        description: '',
        animalSex: AnimalSex.MACHO,
        org_id: orgTaubate.id,
      })
    }

    for (let i = 0; i < 5; i++) {
      await petsRepository.create({
        type: AnimalType.GATO,
        name: 'Pet 1',
        age: 1,
        isFixed: false,
        description: '',
        animalSex: AnimalSex.MACHO,
        org_id: orgSjc.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Sao Jose dos Campos',
    })

    expect(pets).toHaveLength(5)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('Should be able to find pets by filter type', async () => {
    for (let i = 0; i < 6; i++) {
      await petsRepository.create({
        type: i % 2 ? AnimalType.CACHORRO : AnimalType.GATO,
        name: `Pet ${i}`,
        age: 1,
        isFixed: false,
        description: '',
        animalSex: i % 2 ? AnimalSex.MACHO : AnimalSex.FEMEA,
        org_id: orgSjc.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Sao Jose dos Campos',
      type: AnimalType.GATO,
    })

    expect(pets).toHaveLength(3)
  })

  it('Should be able to find pets by age', async () => {
    for (let i = 0; i < 6; i++) {
      await petsRepository.create({
        type: i % 2 ? AnimalType.CACHORRO : AnimalType.GATO,
        name: `Pet ${i}`,
        age: 5,
        isFixed: i % 3 ? true : false,
        description: '',
        animalSex: i % 2 ? AnimalSex.MACHO : AnimalSex.FEMEA,
        org_id: orgSjc.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Sao Jose dos Campos',
      type: AnimalType.GATO,
      age: 5,
    })

    expect(pets).toHaveLength(3)
  })

  it('Should be able to find pets by fixed', async () => {
    for (let i = 0; i < 6; i++) {
      await petsRepository.create({
        type: i % 2 ? AnimalType.CACHORRO : AnimalType.GATO,
        name: `Pet ${i}`,
        age: 5,
        isFixed: i % 3 ? true : false,
        description: '',
        animalSex: i % 2 ? AnimalSex.MACHO : AnimalSex.FEMEA,
        org_id: orgSjc.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Sao Jose dos Campos',
      isFixed: true,
    })

    expect(pets).toHaveLength(4)
  })
})
