import mongoose from 'mongoose'

/**
 * An interface that describes the properties that
 * are required to create a new user
 */
export interface UserAttrs {
	email: string
	password: string
}

/**
 * An interface that describes the properties
 * that a user model has
 */
export interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc
}

/**
 * An interface that describes the properties
 * that a user document has
 */
export interface UserDoc extends mongoose.Document, UserAttrs {
	// createdAt: string
	// updatedAt: string
}

/**
 * An interface that describes the properties
 * of the JWT's body
 */
export interface JwtBody {
	id: string
	email: string
}
