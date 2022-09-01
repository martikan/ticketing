import express, { Request, Response } from 'express'
import { currentUser } from '../middlewares/current_user'

const router = express.Router()

/**
 * Controller to get current user
 */
router.get('/currentuser', currentUser, async (req: Request, res: Response) => {
	res.send({ currentUser: req.currentUser || null })
})

export { router as usersRouter }
