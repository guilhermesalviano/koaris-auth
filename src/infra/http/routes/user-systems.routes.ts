import express from 'express'

import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/ensure-authenticated-middleware-factory'
import { makeCreateUserSystemsController } from '../factories/controllers/create-user-systems-controller-factory'

const userSystemsRouter = express.Router()


userSystemsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()) as any)

userSystemsRouter.post('/', adaptRoute(makeCreateUserSystemsController()) as any)

export { userSystemsRouter }
