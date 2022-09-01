import assert from 'assert'
import request from 'supertest'
import { app, PORT } from '../app'

describe('Main App tests', () => {
	it('shoud returns 404, when page is not found', async () => {
		return request(app).get('/not-exists-page').expect(404)
	})
})
