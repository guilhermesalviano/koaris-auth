import { Controller } from '../../../../core/infra/controller'
import { PrismaUsersRepository } from '../../../../modules/users/repositories/prisma/users-repository'
import { CreateUser } from '../../../../modules/users/use-cases/create-user/create-user'
import { CreateUserController } from '../../../../modules/users/use-cases/create-user/create-user-controller'

export function makeCreateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUser = new CreateUser(prismaUsersRepository)

  const createUserController = new CreateUserController(createUser)

  return createUserController
}
