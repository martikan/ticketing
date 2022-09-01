import mongoose from 'mongoose'
import { UserAttrs, UserDoc, UserModel } from '../types/user'
import { PasswordUtils } from '../utils/password_utils'

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
				delete ret.password
				delete ret.__v
			}
		}
	}
)

/**
 * Pre-save hook to hash the password
 */
userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashedPass = await PasswordUtils.hashPassword(this.get('password'))

		this.set('password', hashedPass)
	}

	done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export default User
