export default function config() {
	return {
		db: {
			mongodb: {
				uri: process.env.MONGODB_URI as string,
			},
		},
		server: {
			port: +(process.env.SERVER_PORT || 5050),
		},
		jwt: {
			accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'at_secret',
			refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'rt_secret',
		},
	}
}
