import { ValidationError } from 'express-validator'
import R from 'ramda'
import { CustomError } from './custom_error'

const formatErr = (e: { msg: string; param: any }): CustomSerializeError => {
	return { message: e.msg, field: e.param }
}

export class RequestValidationError extends CustomError {
	statusCode: number = 400

	constructor(private errors: ValidationError[]) {
		super('Validation error')

		// Only because we're extending a built-in class.
		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeError(): CustomSerializeError[] {
		return R.map(formatErr, this.errors)
	}
}
