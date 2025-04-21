import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/resource-not-found";

interface GetDetailServiceRequest {
  id: string
}

interface GetDetailServiceResponse {
  pet: Pet
}

export class GetDetailService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id
  }: GetDetailServiceRequest): Promise<GetDetailServiceResponse> {

    const pet = await this.petsRepository.getPetById(id)

    
    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}