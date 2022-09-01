import request from 'supertest'
import { app } from '../../app'

describe('Users route tests', () => {
	const BASE_PATH = '/api/v1/users/'

	//
	// currentuser end-point tests
	//

	it('should returns 200 and the current user, when get current user while autheticated', async () => {
		const email: string = 'test@gmail.com'
		const password: string = 'password'

		const cookie = await global.signUpAndLogin(email, password)

		return request(app)
			.get(`${BASE_PATH}/currentuser`)
			.set('Cookie', cookie)
			.expect(200)
			.then((res) => {
				expect(res.body.currentUser.email).toEqual(email)
			})
			.catch((err) => {
				console.error(err)
			})
	})

	it('should returns 200 and empty currentUser, when get current user while NOT autheticated', async () => {
		return request(app)
			.get(`${BASE_PATH}/currentuser`)
			.expect(200)
			.then((res) => {
				expect(res.body.currentUser).toBeNull()
			})
			.catch((err) => {
				console.error(err)
			})
	})
})
