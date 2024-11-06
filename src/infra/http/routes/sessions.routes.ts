import express from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAuthenticateUserController } from '../factories/controllers/create-authenticate-user-controller-factory'


const sessionsRouter = express.Router()

sessionsRouter.post('/', adaptRoute(makeAuthenticateUserController()) as any)

export { sessionsRouter }