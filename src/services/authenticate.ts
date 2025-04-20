import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./erros/invalid-credentials";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string,
  password: string
}

interface AuthenticateServiceResponse {
  org: Org
}

export class AuthenticateService {
  constructor(private orgsRepository: OrgsRepository){}
  
  async execute({email, password}: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMathes = await compare(password, org.password_hash)

    if (!doesPasswordMathes) {
      throw new InvalidCredentialsError()
    }

    return {
      org
    }
  }
}