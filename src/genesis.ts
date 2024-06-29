import Fastify from 'fastify'

import startDbs from './db'
import startRouter from './routers'
import config from './config'

function server() {
	const fastify = Fastify({ logger: false })

	startRouter(fastify)
	startDbs()

	return fastify
}

// Run the server!
if (require.main === module) {
	server().listen({ port: config().server.port }, (err, address) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
		console.log(`Server listening at ${address}`)
	})
	// for serverless
} else {
	module.exports = server
}
