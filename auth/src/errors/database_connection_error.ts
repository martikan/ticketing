import { CustomError } from './custom_error'

export class DatabaseConnectionError extends CustomError {
	statusCode: number = 500
	private msg: string = 'Database connection error'

	constructor() {
		super('Database connection error')

		// Only because we're extending a built-in class.
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}

	serializeError(): CustomSerializeError[] {
		return [{ message: this.msg }]
	}
}
