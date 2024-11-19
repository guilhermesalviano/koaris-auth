import { UserSystems } from '@modules/user-systems/domain/user-systems/user-systems'
import { IUserSystemsRepository } from '../iuser-systems-repository'
import { prisma } from '@infra/prisma/client'

export class PrismaUserSystemsRepository implements IUserSystemsRepository {
  async get(user_systems_id?: string): Promise<UserSystems[] | void> {
    const userSystems = await prisma.userSystems.findMany({
      where: {
        id: user_systems_id,
      },
    })

    const mappedUserSystems = userSystems.map((system: any) => ({
      props: {
        user_id: system.user_id,
        system_id: system.system_id,
        login_active: system.login_active
      },
    })) as any[] as UserSystems[]

    return mappedUserSystems
  }

  async save(userSystems: UserSystems): Promise<void> {
    await prisma.userSystems.update({
      where: {
        id: userSystems.user_systems_id,
      },
      data: {
        user_id: userSystems.user_id,
        system_id: userSystems.system_id,
        login_active: userSystems.login_active
      },
    })
  }

  async create(userSystems: UserSystems): Promise<void> {
    await prisma.userSystems.create({
      data: {
        user_id: userSystems.user_id,
        system_id: userSystems.system_id,
        login_active: userSystems.login_active
      },
    })
  }

  async delete(user_systems_id: string): Promise<boolean> {
    const result = await prisma.userSystems.delete({
      where: {
        id: user_systems_id,
      },
    })
    return true
  }
}
