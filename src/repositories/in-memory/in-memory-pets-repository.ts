import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '@/services/erros/resource-not-found'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'
import { AnimalSex } from '@/@types/animal-sex'
import { AnimalType } from '@/@types/animal-type'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepo: InMemoryOrgsRepository) {}
  public pets: Pet[] = []

  async listPetsByFilters(
    city: string,
    age?: number,
    animalSex?: AnimalSex,
    type?: AnimalType,
    isFixed?: boolean,
  ): Promise<Pet[]> {
    const orgs = this.orgsRepo.orgs.filter((item) => {
      return item.city === city
    })

    const orgsId = orgs.map((org) => org.id)
    const petsFiltered = this.pets.filter((pet) => orgsId.includes(pet.org_id))

    const pets = petsFiltered.filter(
      (pet) =>
        (age === undefined || pet.age === age) &&
        (animalSex === undefined || pet.animalSex === animalSex) &&
        (type === undefined || pet.type === type) &&
        (isFixed === undefined || pet.isFixed === isFixed),
    )

    return pets
  }

  async listPetsByCity(city: string) {
    const orgs = this.orgsRepo.orgs.filter((item) => {
      return item.city === city
    })

    const orgsId = orgs.map((org) => org.id)
    const pets = this.pets.filter((pet) => orgsId.includes(pet.org_id))

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      type: data.type,
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
