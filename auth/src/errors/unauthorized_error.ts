import { CustomError } from './custom_error'

export class UnauthorizedError extends CustomError {
	statusCode: number = 401

	constructor() {
		super('Unauthorized')

		Object.setPrototypeOf(this, UnauthorizedError.prototype)
	}

	serializeError(): CustomSerializeError[] {
		return [{ message: 'Unauthorized' }]
	}
}
