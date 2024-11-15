
import { JWT } from '@modules/users/domain/user/jwt'
import { IUsersRepository } from '@modules/users/repositories/iuser-repository'

type TokenResponse = {
  token: string
}

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = TokenResponse | Error

export class AuthenticateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error(`User not found.`)
    }

    const isPasswordValid = await user.password.comparePassword(password)

    if (isPasswordValid === false) {
      throw new Error(`Invalid password.`)
    }
    
    const { token } = JWT.signUser(user)

    return { token }
  }
}