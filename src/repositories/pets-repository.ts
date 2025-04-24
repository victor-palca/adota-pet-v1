import { AnimalType } from '@/@types/animal-type'
import { GenderType, Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getPetById(id: string): Promise<Pet | null>
  listPetsByCity(city: string, page: number): Promise<Pet[]>
  listPetsByFilters(
    city: string,
    page: number,
    age?: number,
    gender?: GenderType,
    type?: AnimalType,
    isFixed?: boolean,
  ): Promise<Pet[]>
}
