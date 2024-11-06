import express from 'express'

import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/ensure-authenticated-middleware-factory'

import { makeCreateUserController } from '../factories/controllers/create-user-controller-factory'
import { makeGetUserController } from '../factories/controllers/get-user-controller-factory'

const usersRouter = express.Router()

usersRouter.get('/', adaptRoute(makeGetUserController()) as any)

usersRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()) as any)

usersRouter.post('/', adaptRoute(makeCreateUserController()) as any)

export { usersRouter }
