import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AnimalSex } from '@/@types/animal-sex'
import { ResourceNotFoundError } from '../erros/resource-not-found'
import { AnimalType } from '@/@types/animal-type'
import { GetPetByCityService } from './get-pet-by-city'
import { Org } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetByCityService

let orgTaubate: Org
let orgSjc: Org

describe('Get Pet By City', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetByCityService(petsRepository)

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

  it('Should be able to find pets by org city', async () => {
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
        type: AnimalType.CACHORRO,
        name: 'Pet 1',
        age: 1,
        isFixed: false,
        description: '',
        animalSex: AnimalSex.MACHO,
        org_id: orgSjc.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Taubate',
    })

    expect(pets).toHaveLength(3)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('Should not be able to find pets by org city where city do not have pet', async () => {
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
        type: AnimalType.CACHORRO,
        name: 'Pet 1',
        age: 1,
        isFixed: false,
        description: '',
        animalSex: AnimalSex.MACHO,
        org_id: orgSjc.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Cacapava',
    })

    expect(pets).toHaveLength(0)
  })
})
