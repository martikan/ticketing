import { CustomSerializeError } from '../types/error'

export abstract class CustomError extends Error {
	abstract statusCode: number

	constructor(message: string) {
		super(message)

		// Only because we're extending a built-in class.
		Object.setPrototypeOf(this, CustomError.prototype)
	}

	abstract serializeError(): CustomSerializeError[]
}
