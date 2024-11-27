import { UserSystems } from '../../../../modules/user-systems/domain/user-systems/user-systems'
import { IUserSystemsRepository } from "../iuser-systems-repository"


export class InMemoryUserSystemsRepository implements IUserSystemsRepository {
  constructor(public items: UserSystems[] = []) {}

  async get(userSystems_id?: string): Promise<UserSystems[] | void> {
    return this.items.filter((userSystems) => !userSystems_id || userSystems.user_systems_id === userSystems_id)
  }

  async save(userSystems: UserSystems): Promise<void> {
    const systemIndex = this.items.findIndex(
      (findUserSystems) => findUserSystems.user_systems_id === userSystems.user_systems_id || (findUserSystems.system_id === userSystems.system_id && findUserSystems.user_id === userSystems.user_id),
    )
    this.items[systemIndex] = userSystems
  }

  async create(userSystems: UserSystems): Promise<void> {
    this.items.push(userSystems)
  }

  async delete(userSystems_id: string): Promise<boolean> {
    if (this.items.some((userSystems) => userSystems.user_systems_id === userSystems_id)) {
      this.items = this.items.filter((userSystems) => userSystems.user_systems_id !== userSystems_id)
      return true
    }
    return false
  }
}
