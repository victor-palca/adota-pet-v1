import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgService } from './create-org'
import { OrgAlreadyExistsError } from '../erros/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgService
describe('Create Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('Should be able to create a org', async () => {
    const { org } = await sut.execute({
      password: '123456',
      name: 'Org 1',
      email: 'org1@teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Taubate',
      state: 'SP',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to create a org with same email', async () => {
    await sut.execute({
      password: '123456',
      name: 'Org 1',
      email: 'org1@teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Taubate',
      state: 'SP',
    })

    await expect(() =>
      sut.execute({
        password: '123456',
        name: 'Org 2',
        email: 'org1@teste.com',
        cnpj: '12345678922',
        description: 'teste',
        phone: '12345678922',
        city: 'Taubate',
        state: 'SP',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('Should not be able to create a org with same cpnj', async () => {
    await sut.execute({
      password: '123456',
      name: 'Org 1',
      email: 'org12teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Taubate',
      state: 'SP',
    })

    await expect(() =>
      sut.execute({
        password: '123456',
        name: 'Org 2',
        email: 'org1@teste.com',
        cnpj: '123456789',
        description: 'teste',
        phone: '12345678922',
        city: 'Taubate',
        state: 'SP',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('Should not be able to create a org with same phone', async () => {
    await sut.execute({
      password: '123456',
      name: 'Org 1',
      email: 'org12teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '12345678922',
      city: 'Taubate',
      state: 'SP',
    })

    await expect(() =>
      sut.execute({
        password: '123456',
        name: 'Org 2',
        email: 'org1@teste.com',
        cnpj: '12345678922',
        description: 'teste',
        phone: '12345678922',
        city: 'Taubate',
        state: 'SP',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
