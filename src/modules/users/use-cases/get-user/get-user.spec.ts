import { beforeAll, describe, expect, it } from 'vitest'

import { CreateUser } from '../create-user/create-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { IUsersRepository } from '../../repositories/iuser-repository'
import { GetUser } from './get-user'
import { Chance } from 'chance'
import { User } from '../../domain/user/user'
import { Password } from '../../domain/user/password'

let usersRepository: IUsersRepository
const chance = new Chance()

describe('Get a User', () => {
  const result: User[] = []

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)

    result.push(
      await createUser.execute({
        name: chance.name(),
        email: chance.email(),
        password: '123456',
        updated_at: new Date(),
        created_at: new Date()
      }),
    )

    result.push(
      await createUser.execute({
        name: chance.name(),
        email: chance.email(),
        password: '123456',
        updated_at: new Date(),
        created_at: new Date()
      }),
    )
  })

  it('should be able to get a specific user', async () => {
    const getUser = new GetUser(usersRepository)

    const user = await getUser.execute({
      user_id: result[0].user_id,
    })

    expect(user).toEqual([result[0]])
  })

  it('should be able to get users', async () => {
    const getUser = new GetUser(usersRepository)

    const user = await getUser.execute({})

    expect(user).toEqual(result)
  })
})
