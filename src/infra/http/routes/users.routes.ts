import express, { Request, Response } from 'express'

const usersRouter = express.Router()

usersRouter.get('/', (req: Request, res: Response) => {
  res.send([]);
})

export { usersRouter }
