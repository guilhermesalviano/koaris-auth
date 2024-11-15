import { ISystemsRepository } from '../isystem-repository'
import { System } from '@modules/systems/domain/system/system'

export class InMemoryUsersRepository implements ISystemsRepository {
  constructor(public items: System[] = []) {}

  async get(system_id?: string): Promise<System[] | void> {
    return this.items.filter((system) => !system_id || system.system_id === system_id)
  }

  async findByName(name: string): Promise<System | null> {
    const system = this.items.find(system => system.name === name)

    if (!system) {
      return null
    }

    return system
  }

  async save(system: System): Promise<void> {
    const systemIndex = this.items.findIndex(
      (findSystem) => findSystem.system_id === system.system_id,
    )
    this.items[systemIndex] = system
  }

  async create(system: System): Promise<void> {
    this.items.push(system)
  }

  async delete(system_id: string): Promise<boolean> {
    if (this.items.some((system) => system.system_id === system_id)) {
      this.items = this.items.filter((system) => system.system_id !== system_id)
      return true
    }
    return false
  }
}
