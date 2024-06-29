import { AuthService } from '@side-auth/services'

import { type RouteHandler } from 'fastify'

// --------- signup ---------
const signup: RouteHandler<{ Body: SignupBody }> = async (req, reply) => {
	// const { email = 'sawako@fmtu.co', uname = 'sawako', name = 'Sawako', pwd } = req.body || {}
	const { status, message } = await AuthService.signup(req.body)

	if (status === 409) return reply.code(409).send({ message: 'User already exists' })

	if (status === 201) {
		const { tokens } = await AuthService.login(req.body)
		if (tokens) return reply.code(201).send({ message: 'User created', tokens })
	}

	return reply.code(500).send({ message: 'Internal server error' })
}

// --------- login ---------
const login: RouteHandler<{ Body: LoginBody }> = async (req, reply) => {
	// const { email = 'sawako@fmtu.co', uname = 'sawako', pwd = 'sawako' } = req.body || {}
	const { status, tokens } = await AuthService.login(req.body)
	if (status === 404) return reply.code(404).send({ message: 'User not found' })
	if (status === 401) return reply.code(401).send({ message: 'Incorrect password' })

	if (tokens) {
		return reply.code(200).send({ message: 'User logged in', ...tokens })
	}

	return reply.code(500).send({ message: 'Internal server error' })
}

// --------- logout ---------
const logout: RouteHandler = async (req, reply) => {}

const AuthController = { signup, login, logout }
export default AuthController

// --- types ---
interface SignupBody {
	email: string
	pwd: string
	uname: string
	name: string
}

interface LoginBody extends Omit<SignupBody, 'name'> {}
