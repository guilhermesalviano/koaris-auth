import { User } from '@modules/users/domain/user/user'
import { IUsersRepository } from '../iuser-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(public items: User[] = []) {}

  async get(user_id?: string): Promise<User[] | void> {
    return this.items.filter((user) => !user_id || user.user_id === user_id)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User): Promise<void> {
    const userIndex = this.items.findIndex(
      (findUser) => findUser.user_id === user.user_id,
    )
    this.items[userIndex] = user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async delete(user_id: string): Promise<boolean> {
    if (this.items.some((user) => user.user_id === user_id)) {
      this.items = this.items.filter((user) => user.user_id !== user_id)
      return true
    }
    return false
  }
}
