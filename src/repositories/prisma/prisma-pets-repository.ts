import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/database/prisma";

export class PrismaPetRepository implements PetsRepository {
  async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        org: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          }
        }
      }
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    })
    
    return pet
  }
}