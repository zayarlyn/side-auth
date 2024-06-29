import jwt from 'jsonwebtoken'

import config from '@side-auth/config'

const genAccessToken = () => {
	return jwt.sign({}, config().jwt.accessTokenSecret, { expiresIn: '15m' })
}

const genRefreshToken = () => {
	return jwt.sign({}, config().jwt.refreshTokenSecret, { expiresIn: '15m' })
}

const JwtService = { genAccessToken, genRefreshToken }
export default JwtService
