import { User } from '../../../../modules/users/domain/user/user'
import { IUsersRepository } from '../iuser-repository'
import { prisma } from '../../../../infra/prisma/client'
import { UserMapper } from '../../mappers/user-mapper'

export class PrismaUsersRepository implements IUsersRepository {
  async get(user_id?: string): Promise<User[] | void> {
    const users = await prisma.user.findMany({
      where: {
        id: user_id,
      },
    })
    const mappedUsers = users.map((user: any) => ({
      props: {
        user_id: user.id,
        name: user.name,
        email: user.email,
        updated_at: user.updated_at,
        created_at: user.created_at
      },
    })) as any[] as User[]

    return mappedUsers
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.user_id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: await user.password.getHashedValue(),
        updated_at: user.updated_at,
        created_at: user.created_at
      },
    })
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        password: await user.password.getHashedValue(),
        updated_at: user.updated_at,
        created_at: user.created_at
      },
    })
  }

  async delete(user_id: string): Promise<boolean> {
    const result = await prisma.user.delete({
      where: {
        id: user_id,
      },
    })
    return true
  }
}
