import { Controller } from '@core/infra/controller'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/users-repository'
import { AuthenticateUser } from '@modules/users/use-cases/authenticate-user/authenticate-user'
import { AuthenticateUserController } from '@modules/users/use-cases/authenticate-user/authenticate-user-controller'

export function makeAuthenticateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUser = new AuthenticateUser(prismaUsersRepository)

  const authenticateUserController = new AuthenticateUserController(authenticateUser)

  return authenticateUserController
}
