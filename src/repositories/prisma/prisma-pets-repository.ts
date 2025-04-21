import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/database/prisma";

export class PrismaPetRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    console.log(data)
    const pet = await prisma.pet.create({
      data
    })
    
    return pet
  }
}