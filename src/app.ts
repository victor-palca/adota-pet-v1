import fastify from 'fastify'
import { OrgsRoutes } from './http/orgs/routes'

export const app = fastify()

app.register(OrgsRoutes)