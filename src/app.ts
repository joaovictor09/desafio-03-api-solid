import fastify from 'fastify'
import { health } from './http/controllers/health'

export const app = fastify()

app.get('/health', health)
