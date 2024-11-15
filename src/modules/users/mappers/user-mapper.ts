import { Email } from '@modules/users/domain/user/email'
import { Name } from '@modules/users/domain/user/name'
import { Password } from '@modules/users/domain/user/password'
import { User } from '@modules/users/domain/user/user'

import { User as PersistenceUser } from '@prisma/client'

export class UserMapper {
  static toDomain(raw: PersistenceUser): User | null {
    const nameOrError = Name.create(raw.name)
    const emailOrError = Email.create(raw.email)
    const passwordOrError = Password.create(raw.password, true)

    if (!nameOrError) {
      throw new Error('Name value is invalid.')
    }

    if (!emailOrError) {
      throw new Error('Email value is invalid.')
    }

    if (!passwordOrError) {
      throw new Error('Password value is invalid.')
    }

    const userOrError = User.create({
        name: String(nameOrError),
        email: String(emailOrError),
        password: passwordOrError,
        updated_at: raw.updated_at
    }, raw.id)

    if (userOrError) {
      return userOrError
    }

    return null
  }

  static async toPersistence(user: User) {
    return {
      id: user.user_id,
      name: user.name,
      email: user.email,
      password: await user.password.getHashedValue(),
    }
  }
}