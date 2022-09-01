import { CustomError } from './custom_error'

export class NotFoundError extends CustomError {
	statusCode: number = 404

	constructor() {
		super('Resource not found')

		// Only because we're extending a built-in class.
		Object.setPrototypeOf(this, NotFoundError.prototype)
	}

	serializeError(): CustomSerializeError[] {
		return [{ message: 'Resource not found' }]
	}
}
