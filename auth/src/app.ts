import * as dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import cors from 'cors'
import { usersRouter } from './routes/users'
import { authRouter } from './routes/authentication'
import { errorHandler } from './middlewares/error_handler'
import { NotFoundError } from './errors/not_found_error'
import cookieSession from 'cookie-session'

dotenv.config()

/**
 * Environment variables
 */
const PORT: number = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 4000

const DATASOURCE_URL: string | undefined = process.env.DATASOURCE_URL

const DATASOURCE_DB: string | undefined = process.env.DATASOURCE_DB

const JWT_SECRET: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

/**
 * API version numbers
 */
const URL_PREFIX_V1 = '/api/v1'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
)
app.use(cors())
app.use(helmet())

/**
 * Routes
 */
app.use(`${URL_PREFIX_V1}/users`, usersRouter)
app.use(`${URL_PREFIX_V1}/auth`, authRouter)

/**
 * Apply not found error
 */
app.all('*', async () => {
	throw new NotFoundError()
})

/**
 * Error handler
 */
app.use(errorHandler)

export { app, PORT, DATASOURCE_URL, DATASOURCE_DB, JWT_SECRET }
