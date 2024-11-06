import { describe, expect, it } from 'vitest'
import { User } from './user'
import { Password } from './password'

describe('User tests', () => {
  it('should be able to create a new user', async () => {
    const user = new User({
      name: 'Guilherme Farias',
      email: 'guilherme.salviano12@outlook.com',
      password: Password.create('123456'),
      updated_at: new Date(),
      created_at: new Date(),
    })

    expect(user).toBeInstanceOf(User)
    expect(user.email).toEqual('guilherme.salviano12@outlook.com')
    expect(user.user_id).not.toBeNull()
  })
})
