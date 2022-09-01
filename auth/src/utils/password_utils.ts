import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class PasswordUtils {
	static async hashPassword(password: string): Promise<string> {
		const salt: string = randomBytes(8).toString('hex')

		const b: Buffer = (await scryptAsync(password, salt, 64)) as Buffer

		return `${b.toString('hex')}.${salt}`
	}

	static async comparePassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
		const [hash, salt] = hashedPassword.split('.')

		const b: Buffer = (await scryptAsync(plainPassword, salt, 64)) as Buffer

		return hash === b.toString('hex')
	}
}
