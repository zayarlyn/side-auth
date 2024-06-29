import config from '@side-auth/config'
import mongoose from 'mongoose'

export default function startDbs() {
	mongoose
		.connect(config().db.mongodb.uri)
		.then(() => {
			console.log('⛁ mongodb: ready kha :)')
			// User.create({ uname: 'sawako', pwd: 'sawako', email: 'sawako@fmtu.com', name: 'Sawako' })
			// User.create({ uname: 'zayar', pwd: 'zayar', email: 'zayar@fmtu.com', name: 'Zayar' })
		})
		.catch((err) => {
			console.log('⛁ mongoose error: ', err)
		})
}
