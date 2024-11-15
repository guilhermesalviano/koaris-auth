import { UserSystems } from "@prisma/client"
import { IUserSystemsRepository } from "../iuser-systems-repository"


export class InMemoryUsersRepository implements IUserSystemsRepository {
  constructor(public items: UserSystems[] = []) {}

  async get(userSystems_id?: string): Promise<UserSystems[] | void> {
    return this.items.filter((userSystems) => !userSystems_id || userSystems.id === userSystems_id)
  }

  async save(userSystems: UserSystems): Promise<void> {
    const systemIndex = this.items.findIndex(
      (findUserSystems) => findUserSystems.id === userSystems.id || (findUserSystems.system_id === userSystems.system_id && findUserSystems.user_id === userSystems.user_id),
    )
    this.items[systemIndex] = userSystems
  }

  async create(userSystems: UserSystems): Promise<void> {
    this.items.push(userSystems)
  }

  async delete(userSystems_id: string): Promise<boolean> {
    if (this.items.some((userSystems) => userSystems.id === userSystems_id)) {
      this.items = this.items.filter((userSystems) => userSystems.id !== userSystems_id)
      return true
    }
    return false
  }
}
