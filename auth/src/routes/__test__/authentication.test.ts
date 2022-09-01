import request from 'supertest'
import { app } from '../../app'

describe('Authentication route tests', () => {
	const BASE_PATH = '/api/v1/auth/'

	//
	// Sign up end-point tests
	//

	it('should returns a 201 on a successful sign up', async () => {
		const email: string = 'test2@gmail.com'
		const password: string = 'password'

		return global.signUpAndLogin(email, password)
	})

	it('should returns a 400 if the email is missing at sign up', async () => {
		return request(app)
			.post(`${BASE_PATH}/signup`)
			.send({
				email: '',
				password: 'password'
			})
			.expect(400)
	})

	it('should returns a 400 if the email is invalid at sign up', async () => {
		return request(app)
			.post(`${BASE_PATH}/signup`)
			.send({
				email: 'testasd',
				password: 'password'
			})
			.expect(400)
	})

	it('should returns a 400 if the password is less then 6 characters at sign up', async () => {
		return request(app)
			.post(`${BASE_PATH}/signup`)
			.send({
				email: 'test@gmail.com',
				password: 'aaa'
			})
			.expect(400)
	})

	it('should returns a 400 if the password is greater then 64 characters at sign up', async () => {
		return request(app)
			.post(`${BASE_PATH}/signup`)
			.send({
				email: 'test@gmail.com',
				password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // 67 characters
			})
			.expect(400)
	})

	it('should returns a 400 if the email is already exist at sign up', async () => {
		const email: string = 'test@gmail.com'
		const password: string = 'password'

		// Create an initial user
		await global.signUpAndLogin(email, password)

		// We can check it with the email address of the initial user
		return request(app)
			.post(`${BASE_PATH}/signup`)
			.send({
				email: 'test@gmail.com',
				password: 'password'
			})
			.expect(400)
	})

	//
	// Sign in end-point tests
	//

	it('should returns a 200, the user and a JWT cookie on a successful sign in', async () => {
		const email: string = 'test@gmail.com'
		const password: string = 'password'

		// Create an initial user
		await global.signUpAndLogin(email, password)

		const res = await request(app)
			.post(`${BASE_PATH}/signin`)
			.send({
				email: email,
				password: password
			})
			.expect(200)

		expect(res.get('Set-Cookie')).toBeDefined()
		expect(res.body.email).toEqual(email)
		expect(res.body.password).toBeUndefined()
	})

	it('should returns a 400 if the email is missing at sign in', async () => {
		return request(app)
			.post(`${BASE_PATH}/signin`)
			.send({
				email: '',
				password: 'password'
			})
			.expect(400)
	})

	it('should returns a 400 if the email is invalid at sign in', async () => {
		return request(app)
			.post(`${BASE_PATH}/signin`)
			.send({
				email: 'testmail',
				password: 'password'
			})
			.expect(400)
	})

	it('should returns a 400 if the password is missing at sign in', async () => {
		return request(app)
			.post(`${BASE_PATH}/signin`)
			.send({
				email: 'test@gmail.com',
				password: ''
			})
			.expect(400)
	})

	it('should returns a 400 if the password is not correct at sign in', async () => {
		const email: string = 'test@gmail.com'
		const password: string = 'password'

		await global.signUpAndLogin(email, password)

		return request(app)
			.post(`${BASE_PATH}/signin`)
			.send({
				email: email,
				password: 'wrong password'
			})
			.expect(400)
	})

	//
	// Sign out end-point tests
	//

	it('should returns a 200 and remove the cookie, when the user sign out', async () => {
		const email: string = 'test@gmail.com'
		const password: string = 'password'

		// Create an initial user
		await global.signUpAndLogin(email, password)

		const res = await request(app).post(`${BASE_PATH}/signout`).send({}).expect(200)

		expect(res.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
	})
})
