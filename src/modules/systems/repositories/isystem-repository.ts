import { System } from "../domain/system/system"

export interface ISystemsRepository {
  get(system_id?: string): Promise<System[] | void>
  findByName(name: string): Promise<System | null>
  save(user: System): Promise<void>
  create(user: System): Promise<void>
  delete(system_id: string): Promise<boolean>
}
