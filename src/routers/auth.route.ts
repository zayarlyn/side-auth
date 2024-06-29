import { AuthController } from '@side-auth/controllers'

import { type FastifyInstance } from 'fastify'

export default function startAuthRouter(fastify: FastifyInstance) {
	fastify.route({ method: 'POST', url: '/auth/sign-up', handler: AuthController.signup })
	fastify.route({ method: 'POST', url: '/auth/login', handler: AuthController.login })
	fastify.route({ method: 'POST', url: '/auth/logout', handler: AuthController.logout })
}
