import express from 'express'

import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'

import { makeCreateUserController } from '../factories/controllers/create-user-controller-factory'
import { makeGetUserController } from '../factories/controllers/get-user-controller-factory'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeCreateUserController()) as any)
usersRouter.get('/', adaptRoute(makeGetUserController()) as any)

export { usersRouter }
