import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
	var signUpAndLogin: (email: string, password: string) => Promise<string[]>
}

beforeAll(async () => {
	process.env.JWT_SECRET = 'AAAAASSDDWQD'

	await mongoose.connect('mongodb://localhost:27017/auth')
})

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections()

	for (const c of collections) {
		await c.deleteMany({})
	}
})

afterAll(async () => {
	await mongoose.connection.close()
})

/**
 * Sign up an initial user and get it's cookies
 */
global.signUpAndLogin = async (email: string, password: string) => {
	await request(app)
		.post('/api/v1/auth/signup')
		.send({
			email: email,
			password: password
		})
		.expect(201)

	const res = await request(app)
		.post('/api/v1/auth/signin')
		.send({
			email: email,
			password: password
		})
		.expect(200)

	const cookie = res.get('Set-Cookie')

	return cookie
}
