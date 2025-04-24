import { AnimalType } from '@/@types/animal-type'
import { PetsRepository } from '@/repositories/pets-repository'
import { GenderType, Pet } from '@prisma/client'

interface GetPetByFilterServiceRequest {
  city: string
  page: number
  age?: number
  gender?: GenderType
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
    gender,
    type,
    isFixed,
  }: GetPetByFilterServiceRequest): Promise<GetPetByFilterServiceResponse> {
    const pets = await this.petsRepository.listPetsByFilters(
      city,
      page,
      age,
      gender,
      type,
      isFixed,
    )

    return {
      pets,
    }
  }
}
