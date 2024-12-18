import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserSystemsRepository } from '../../repositories/in-memory/in-memory-user-systems-repository'
import { IUserSystemsRepository } from '../../repositories/iuser-systems-repository'
import { CreateUserSystems } from './create-user-systems'
import { UserSystems } from '../../domain/user-systems/user-systems'

let userSystemsRepository: IUserSystemsRepository

describe('Create a User-System', () => {
  beforeEach(() => {
    userSystemsRepository = new InMemoryUserSystemsRepository()
  })

  it('should be able to create a user system', async () => {
    const createUserSystems = new CreateUserSystems(userSystemsRepository)

    expect(
      createUserSystems.execute({
        user_id: "d29363a5-2323-47f5-a144-e01fa25bca16",
        system_id: "f42c177b-639b-432b-bc4b-4aabccb7bde6",
        login_active: true
      }),
    ).resolves.toBeInstanceOf(UserSystems)
  })

})
