import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../erros/org-already-exists-error";

interface CreateOrgServiceRequest {
  password: string,
  name: string,
  email: string,
  cnpj: string,
  description?: string,
  phone: string,
  city: string,
  state: string,
}

interface CreateOrgServiceResponse {
  org: Org
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository){}

  async execute({
    name,
    email,
    password,
    cnpj,
    description,
    phone,
    city,
    state,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const password_hash = await hash(password, 6)
    const orgAlreadyExists = await this.orgsRepository.findOrgByUniques(email, phone, cnpj)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      password_hash,
      name,
      email,
      cnpj,
      description,
      phone,
      city,
      state,
    })

    return {
      org,
    }
  }
}