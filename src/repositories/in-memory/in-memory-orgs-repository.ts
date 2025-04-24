import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cnpj: data.cnpj,
      description: data.description ? data.description : null,
      phone: data.phone,
      city: data.city,
      state: data.state,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findOrgByUniques(email: string, phone: string, cnpj: string) {
    const org = this.orgs.find(
      (item) =>
        item.email === email || item.phone === phone || item.cnpj === cnpj,
    )

    if (!org) {
      return null
    }

    return org
  }
  async findByEmail(email: string) {
    const org = this.orgs.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
