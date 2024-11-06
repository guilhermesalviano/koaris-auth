import { beforeEach, describe, expect, it } from 'vitest'

import { User } from '@core/entities/user/user'
import { CreateUser } from './create-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { IUsersRepository } from '../../repositories/iuser-repository'
import { Password } from '@core/entities/user/password'

let usersRepository: IUsersRepository

describe('Create a User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
  })

  it('should be able to create a user', async () => {
    const createUser = new CreateUser(usersRepository)

    expect(
      createUser.execute({
        name: "guilherme salviano",
        email: "guilherme.salviano@email.com",
        password: await Password.create("123456").getHashedValue(),
        updated_at: new Date(),
        created_at: new Date()
      }),
    ).resolves.toBeInstanceOf(User)
  })

})