import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../app'
import { JwtBody } from '../types/user'

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
