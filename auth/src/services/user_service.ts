import User from '../models/user'
import { UserAttrs, UserDoc } from '../types/user'

/**
 * Service to find user by email address
 * @param email the unique email address
 * @returns UserDoc or null if not found
 */
const findUserByEmail = async (email: string): Promise<UserDoc | null> => {
	return await User.findOne({ email: email })
}

/**
 * Service to check if is there a user with
 * the same email address
 * @param email the unique email address
 * @returns true if it's already exist
 */
const userExistsByEmail = async (email: string): Promise<boolean> => {
	const existingUser = await User.findOne({ email: email })

	if (existingUser) {
		return true
	}

	return false
}

/**
 * Service to save the user
 * @param user the user which has to be saved
 * @returns UserDoc
 */
const saveUser = async (user: UserAttrs): Promise<UserDoc> => {
	const usr = User.build(user)

	return await usr.save()
}

const UserService = {
	findUserByEmail,
	userExistsByEmail,
	saveUser
}

export default UserService
