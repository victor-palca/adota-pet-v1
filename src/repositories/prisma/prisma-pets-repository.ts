import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/database/prisma'
import { AnimalSex } from '@/@types/gender-type'
import { AnimalType } from '@/@types/animal-type'

export class PrismaPetRepository implements PetsRepository {
  async listPetsByFilters(
    city: string,
    page: number,
    age?: number,
    animalSex?: AnimalSex,
    type?: AnimalType,
    isFixed?: boolean,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...(age !== undefined && { age }),
        ...(animalSex !== undefined && { animalSex }),
        ...(type !== undefined && { type }),
        ...(isFixed !== undefined && { isFixed }),
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return pets
  }
  async listPetsByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return pets
  }

  async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
