import express, { Request, Response } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeGetUserController } from '../factories/controllers/get-user-controller-factory'

const usersRouter = express.Router()

usersRouter.get('/', adaptRoute(makeGetUserController()))

export { usersRouter }
