import { UserSystems } from "@prisma/client"


export interface IUserSystemsRepository {
  get(system_id?: string): Promise<UserSystems[] | void>
  save(user: UserSystems): Promise<void>
  create(user: Omit<UserSystems, 'id'>): Promise<void>
  delete(system_id: string): Promise<boolean>
}
