import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetByCityServiceRequest {
  city: string
}

interface GetPetByCityServiceResponse {
  pets: Pet[]
}

export class GetPetByCityService {
  constructor(private petsRespository: PetsRepository) {}

  async execute({
    city,
  }: GetPetByCityServiceRequest): Promise<GetPetByCityServiceResponse> {
    const pets = await this.petsRespository.listPetsByCity(city)

    return {
      pets,
    }
  }
}
