import { Router, Request, Response } from 'express'

import { usersRouter } from './users.routes'

const routes = Router()
routes.get('/status', (req: Request, res: Response) => {
  res.send({ message: "Everything's fine!" });
})

routes.use('/users', usersRouter)

export default routes
