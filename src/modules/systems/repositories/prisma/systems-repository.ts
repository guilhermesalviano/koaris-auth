import { System } from '@modules/systems/domain/system/system'
import { ISystemsRepository } from '../isystem-repository'
import { prisma } from '@infra/prisma/client'

export class PrismaSystemsRepository implements ISystemsRepository {
  async get(system_id?: string): Promise<System[] | void> {
    const systems = await prisma.system.findMany({
      where: {
        id: system_id,
      },
    })

    const mappedSystems = systems.map((system: any) => ({
      props: {
        system_id: system.id,
        name: system.name,
        description: system.description,
        updated_at: system.updated_at,
        created_at: system.created_at
      },
    })) as any[] as System[]

    return mappedSystems
  }

  async findByName(name: string): Promise<System | null> {
    const system = await prisma.system.findFirst({
      where: {
        name,
      }
    })

    if (!system) {
      return null
    }

    return System.create({
      name: system.name,
      description: system.description,
      updated_at: system.updated_at,
      created_at: system.created_at,
    }, system.id)
  }

  async save(system: System): Promise<void> {
    await prisma.system.update({
      where: {
        id: system.system_id,
      },
      data: {
        name: system.name,
        description: system.description,
        updated_at: system.updated_at,
        created_at: system.created_at
      },
    })
  }

  async create(system: System): Promise<void> {
    await prisma.system.create({
      data: {
        id: system.system_id,
        name: system.name,
        description: system.description,
        updated_at: system.updated_at,
        created_at: system.created_at
      },
    })
  }

  async delete(system_id: string): Promise<boolean> {
    const result = await prisma.system.delete({
      where: {
        id: system_id,
      },
    })
    return true
  }
}
