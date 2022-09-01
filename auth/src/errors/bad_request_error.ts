import { CustomError } from './custom_error'

export class BadRequestError extends CustomError {
	statusCode: number = 400

	constructor(public message: string) {
		super(message)

		Object.setPrototypeOf(this, BadRequestError.prototype)
	}

	serializeError(): CustomSerializeError[] {
		return [{ message: this.message }]
	}
}
