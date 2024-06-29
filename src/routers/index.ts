import startAuthRouter from './auth.route'

import { type FastifyInstance } from 'fastify'

export default function startRouter(fastify: FastifyInstance) {
	fastify.get('/', async function handler(request, reply) {
		return { hello: 'world' }
	})

	startAuthRouter(fastify)
}
