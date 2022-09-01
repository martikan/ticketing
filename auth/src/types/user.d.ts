import mongoose from 'mongoose'

/**
 * An interface that describes the properties that
 * are required to create a new user
 */
interface UserAttrs {
	email: string
	password: string
}

/**
 * An interface that describes the properties
 * that a user model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc
}

/**
 * An interface that describes the properties
 * that a user document has
 */
interface UserDoc extends mongoose.Document, UserAttrs {
	// createdAt: string
	// updatedAt: string
}

/**
 * An interface that describes the properties
 * of the JWT's body
 */
interface JwtBody {
	id: string
	email: string
}
