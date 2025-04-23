import { AnimalSex } from '@/@types/animal-sex'
import { PetsRepository } from '@/repositories/pets-repository'
import { AnimalType, Pet } from '@prisma/client'

interface CreatePetServiceRequest {
  type: AnimalType
  name: string
  age?: number
  isFixed: boolean
  description?: string
  animalSex: AnimalSex
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
    animalSex,
    orgId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      type,
      name,
      age,
      isFixed,
      description,
      animalSex,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
