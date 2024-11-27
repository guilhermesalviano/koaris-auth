import { Controller } from '../../../../core/infra/controller'
import { GetUser } from '../../../../modules/users/use-cases/get-user/get-user'
import { PrismaUsersRepository } from '../../../../modules/users/repositories/prisma/users-repository'
import { GetUserController } from '../../../../modules/users/use-cases/get-user/get-user-controller'

export function makeGetUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUser = new GetUser(prismaUsersRepository)

  const getUserController = new GetUserController(getUser)

  return getUserController
}
