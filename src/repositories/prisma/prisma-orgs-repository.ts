import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/database/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email 
      }
    })

    return org
  }
  async findOrgByUniques(email: string, phone: string, cnpj: string) {
    const org = await prisma.org.findFirst({
      where: {
        OR: [
          { email },
          { phone },
          { cnpj },
        ]
      }
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }
}