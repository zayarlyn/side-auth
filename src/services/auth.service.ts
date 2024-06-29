import { User } from '@side-auth/db/collections'
import JwtService from './jwt.service'

import { type RouteHandler } from 'fastify'

const signup = async (data: SignupBody) => {
	const { email = 'sawako@fmtu.co', uname = 'sawako', name = 'Sawako', pwd } = data

	const dbUser = await User.findOne({ $or: [{ email }, { uname }] })
	if (dbUser) return { status: 409, message: 'User already exists' }

	const user = new User({ email, uname, pwd, name })
	await user.save()

	return { status: 201, message: 'User created' }
}

const login = async (data: LoginBody) => {
	const { email = 'sawako@fmtu.co', uname = 'sawako', pwd = 'sawako' } = data

	const dbUser = await User.findOne({ $or: [{ email }, { uname }] })
	if (!dbUser) return { status: 404, message: 'User not found', tokens: undefined }
	if (dbUser.pwd !== pwd) return { status: 401, message: 'Incorrect password', tokens: undefined }

	const tokens = { access: JwtService.genAccessToken(), refresh: JwtService.genRefreshToken() }

	return { status: 200, message: 'User logged in', tokens }
}

const logout: RouteHandler = async (req, reply) => {}

const AuthService = { signup, login, logout }
export default AuthService

// --- types ---
interface SignupBody {
	email: string
	pwd: string
	uname: string
	name: string
}

interface LoginBody extends Omit<SignupBody, 'name'> {}
