import mongoose from 'mongoose'
import { app, DATASOURCE_DB, DATASOURCE_URL, JWT_SECRET, PORT } from './app'

/**
 * Start server and connect mongodb
 */
const start = async () => {
	console.log('Starting up...')

	// FIXME: Add proper logging

	if (!DATASOURCE_URL || !DATASOURCE_DB) {
		console.error('DATASOURCE_URL and DATASOURCE_DB is required')
	}

	if (JWT_SECRET.trim() === '') {
		console.error('JWT_SECRET is required')
	}

	try {
		await mongoose.connect(`${DATASOURCE_URL}/${DATASOURCE_DB}`)
		console.log('Connected to mongodb')
	} catch (err) {
		console.error(err)
	}

	app.listen(PORT, () => {
		console.log(`Listening on port: ${PORT}`)
	})
}

start()
