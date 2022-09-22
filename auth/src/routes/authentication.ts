import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '@martikan/common'
import UserService from '../services/user_service'
import jwt from 'jsonwebtoken'
import { PasswordUtils } from '../utils/password_utils'
import validateRequest from '@martikan/common'
import { JwtBody } from '../types/user'
import { JWT_SECRET } from '../app'

const router = express.Router()

/**
 * Controller to sign up new user
 */
router.post(
	'/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().isLength({ min: 6, max: 64 }).withMessage('Password must be at least 6 characters long')
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body

		if (await UserService.userExistsByEmail(email)) {
			throw new BadRequestError('Email is already exist')
		}

		const savedUser = await UserService.saveUser({ email, password })

		return res.status(201).send(savedUser)
	}
)

/**
 * Controller to sign in a user
 */
router.post(
	'/signin',
	[
		body('email').isLength({ min: 5 }).isEmail().withMessage('Email must be valid'),
		body('password').trim().notEmpty().withMessage('Password is required')
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body

		const user = await UserService.findUserByEmail(email)

		if (!user || !(await PasswordUtils.comparePassword(user.password, password))) {
			throw new BadRequestError('User has not found or bad credentials')
		}

		// Generate JWT token
		const jwtBody: JwtBody = { id: user.id, email: user.email }

		const newJwt = jwt.sign(jwtBody, JWT_SECRET)

		// Store it in session
		req.session = {
			jwt: newJwt
		}

		res.send(user)
	}
)

/**
 * Controller to sign out the current user
 */
router.post('/signout', async (req: Request, res: Response) => {
	req.session = null

	res.send({})
})

export { router as authRouter }
