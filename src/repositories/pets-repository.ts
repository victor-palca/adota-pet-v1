import { AnimalSex } from '@/@types/animal-sex'
import { AnimalType } from '@/@types/animal-type'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getPetById(id: string): Promise<Pet | null>
  listPetsByCity(city: string, page: number): Promise<Pet[]>
  listPetsByFilters(
    city: string,
    page: number,
    age?: number,
    animalSex?: AnimalSex,
    type?: AnimalType,
    isFixed?: boolean,
  ): Promise<Pet[]>
}
