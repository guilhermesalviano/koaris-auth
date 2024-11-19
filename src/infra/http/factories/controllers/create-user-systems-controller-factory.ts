import { Controller } from '@core/infra/controller'
import { PrismaUserSystemsRepository } from '@modules/user-systems/repositories/prisma/user-systems-repository'
import { CreateUserSystems } from '@modules/user-systems/use-cases/create-user-system/create-user-systems'
import { CreateUserSystemsController } from '@modules/user-systems/use-cases/create-user-system/create-user-systems-controller'



export function makeCreateUserSystemsController(): Controller {
  const prismaSystemsRepository = new PrismaUserSystemsRepository()
  const createSystem = new CreateUserSystems(prismaSystemsRepository)

  const createSystemController = new CreateUserSystemsController(createSystem)

  return createSystemController
}
