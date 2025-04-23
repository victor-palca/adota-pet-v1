import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '../erros/org-already-exists-error'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../erros/invalid-credentials'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateService
describe('Aythenticate Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateService(orgsRepository)
  })

  it('Should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      password_hash: await hash('123456', 6),
      email: 'org1@teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Taubate',
      state: 'SP',
    })

    const { org } = await sut.execute({
      email: 'org1@teste.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should be able to authenticate with invalid credentials', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      password_hash: await hash('123456', 6),
      email: 'org1@teste.com',
      cnpj: '123456789',
      description: 'teste',
      phone: '123456789',
      city: 'Taubate',
      state: 'SP',
    })

    await expect(() =>
      sut.execute({
        email: 'org1@testee.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
