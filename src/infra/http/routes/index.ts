import { Router, Request, Response } from 'express'

import { usersRouter } from './users.routes'
import { sessionsRouter } from './sessions.routes';

const routes = Router()
routes.get('/status', (req: Request, res: Response) => {
  res.send({ message: "Everything's fine!" });
})

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
