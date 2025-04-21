import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findOrgByUniques(
    email: string,
    phone: string,
    cnpj: string,
  ): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
