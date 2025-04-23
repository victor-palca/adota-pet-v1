import { AnimalSex } from '@/@types/animal-sex'
import { AnimalType } from '@/@types/animal-type'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetByFilterServiceRequest {
  city: string
  page: number
  age?: number
  animalSex?: AnimalSex
  type?: AnimalType
  isFixed?: boolean
}

interface GetPetByFilterServiceResponse {
  pets: Pet[]
}

export class GetPetByFilterService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    age,
    animalSex,
    type,
    isFixed,
  }: GetPetByFilterServiceRequest): Promise<GetPetByFilterServiceResponse> {
    const pets = await this.petsRepository.listPetsByFilters(
      city,
      page,
      age,
      animalSex,
      type,
      isFixed,
    )

    return {
      pets,
    }
  }
}
