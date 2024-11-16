import { createUser } from "../../../../test/factories/user-factory"

import { IUsersRepository } from "../../repositories/iuser-repository"
import { AuthenticateUser } from "./authenticate-user"
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository"
import { beforeEach, describe, expect, it } from "vitest"

let usersRepository: IUsersRepository
let authenticateUser: AuthenticateUser

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUser = new AuthenticateUser(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const user = createUser()

    usersRepository.create(user)

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response).toBeTruthy()
    expect(response).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    )
  })

  it('should not be able to authenticate with invalid e-mail', async () => {
    expect(authenticateUser.execute({
      email: 'invalid@example.com',
      password: '123456',
    })).rejects.toThrowError('User not found.')
  })

  it('should not be able to authenticate with invalid password', async () => {
    const user = createUser()

    usersRepository.create(user)

    expect(authenticateUser.execute({
      email: 'john@doe.com',
      password: 'invalid-password',
    })).rejects.toThrow('Invalid password.')
  })
})