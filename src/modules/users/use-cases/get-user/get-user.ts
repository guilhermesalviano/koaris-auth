import { User } from '@modules/users/domain/user/user'
import { IUsersRepository } from '../../repositories/iuser-repository'

interface GetUserRequest {
  user_id?: string
}

type GetUserResponse = User[] | void

export class GetUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ user_id }: GetUserRequest): Promise<GetUserResponse> {
    const users = await this.usersRepository.get(user_id)

    return users
  }
}
