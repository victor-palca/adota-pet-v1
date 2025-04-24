import { PetsRepository } from '@/repositories/pets-repository'
import { AnimalType, GenderType, Pet } from '@prisma/client'

interface CreatePetServiceRequest {
  type: AnimalType
  name: string
  age?: number
  isFixed: boolean
  description?: string
  gender: GenderType
  orgId: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    type,
    name,
    age,
    isFixed,
    description,
    gender,
    orgId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      type,
      name,
      age,
      isFixed,
      description,
      gender,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
