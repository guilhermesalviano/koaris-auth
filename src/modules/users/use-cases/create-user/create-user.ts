import { User } from '@core/entities/user/user'
import { IUsersRepository } from '../../repositories/iuser-repository'
import { Password } from '@core/entities/user/password'

interface CreateUserRequest {
  name: string
  email: string
  password: string
  updated_at: Date
  created_at: Date
}

type CreateUserResponse = User

export class CreateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    updated_at,
    created_at
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error(`User already exists`)
    }

    const user = new User({
      name,
      email,
      password: await Password.create(password),
      updated_at,
      created_at
    })

    await this.usersRepository.create(user)

    return user
  }
}
