import { Controller } from '../../../../core/infra/controller'
import { PrismaSystemsRepository } from '../../../../modules/systems/repositories/prisma/systems-repository'
import { CreateSystem } from '../../../../modules/systems/use-cases/create-system/create-system'
import { CreateSystemController } from '../../../../modules/systems/use-cases/create-system/create-system-controller'

export function makeCreateSystemController(): Controller {
  const prismaSystemsRepository = new PrismaSystemsRepository()
  const createSystem = new CreateSystem(prismaSystemsRepository)

  const createSystemController = new CreateSystemController(createSystem)

  return createSystemController
}
