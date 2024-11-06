import { Email } from "@core/entities/user/email"
import { JWT } from "@core/entities/user/jwt"
import { Name } from "@core/entities/user/name"
import { Password } from "@core/entities/user/password"
import { User } from "@core/entities/user/user"


type UserOverrides = {
  email?: string
  password?: string
}

export function createUser(overrides?: UserOverrides) {
  const name = Name.create('John Doe') as Name
  const email = Email.create(overrides?.email ?? 'john@doe.com') as Email
  const password = Password.create(overrides?.password ?? '123456') as Password

  const user = User.create({
    name: 'John Doe',
    email: 'john@doe.com',
    password,
    updated_at: new Date(),
    created_at: new Date()
  })

  return user as User
}

export function createAndAuthenticateUser() {
  const name = Name.create('John Doe') as Name
  const email = Email.create('johndoe@example.com') as Email
  const password = Password.create('johndoe123') as Password

  const user = User.create({
    name: String(name),
    email: String(email),
    password,
    updated_at: new Date()
  }) as User

  const jwt = JWT.signUser(user)

  return {
    user,
    jwt,
  }
}