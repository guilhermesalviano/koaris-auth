import express from 'express'

import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/ensure-authenticated-middleware-factory'

import { makeCreateSystemController } from '../factories/controllers/create-system-controller-factory'
const systemsRouter = express.Router()


systemsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()) as any)

systemsRouter.post('/', adaptRoute(makeCreateSystemController()) as any)

export { systemsRouter }
