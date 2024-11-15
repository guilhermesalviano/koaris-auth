import { User } from '@modules/users/domain/user/user'

export interface IUsersRepository {
  get(user_id?: string): Promise<User[] | void>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
  delete(user_id: string): Promise<boolean>
}
