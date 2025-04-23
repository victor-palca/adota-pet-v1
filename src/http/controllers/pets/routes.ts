import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { registerPet } from './register'
import { getPetDetail } from './get-pet-detail'
import { getPetByCity } from './get-pet-by-city'
import { GetPetByFilter } from './get-pet-by-filters'

export function routePet(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, registerPet)
  app.get('/pet/:id', getPetDetail)
  app.get('/pet/city/:city', getPetByCity)
  app.get('/pet', GetPetByFilter)
}
