import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtBody } from '../types/user'

const JWT_SECRET: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

declare global {
	namespace Express {
		interface Request {
			currentUser?: JwtBody
		}
	}
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session?.jwt) {
		return next()
	}

	try {
		const currentUser: JwtBody = jwt.verify(req.session.jwt, JWT_SECRET) as JwtBody
		req.currentUser = currentUser
	} catch (err) {}

	next()
}
