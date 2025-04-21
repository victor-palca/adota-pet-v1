import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '@/services/erros/resource-not-found'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name ? data.name : null,
      age: data.age ? data.age : 0,
      animalSex: data.animalSex,
      description: data.description ? data.description : null,
      isFixed: data.isFixed ? data.isFixed : false,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
  async getPetById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }
}
