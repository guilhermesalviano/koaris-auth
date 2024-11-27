import { System } from '../../../../modules/systems/domain/system/system'
import { ISystemsRepository } from '../../../../modules/systems/repositories/isystem-repository'

interface CreateSystemRequest {
    name: string
    description: string
    updated_at: Date
    created_at: Date
}

type CreateSystemResponse = System

export class CreateSystem {
  constructor(private systemsRepository: ISystemsRepository) {}

  async execute({
    name,
    description,
    updated_at,
    created_at
  }: CreateSystemRequest): Promise<CreateSystemResponse> {
    const systemAlreadyExists = await this.systemsRepository.findByName(name)

    if (systemAlreadyExists) {
      throw new Error(`System already exists`)
    }

    const system = new System({
      name,
      description,
      updated_at,
      created_at
    })

    await this.systemsRepository.create(system)

    return system
  }
}
