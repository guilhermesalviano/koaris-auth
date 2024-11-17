import { UserSystems } from '@modules/user-systems/domain/user-systems/user-systems'
import { IUserSystemsRepository } from '@modules/user-systems/repositories/iuser-systems-repository'

interface CreateUserSystemsRequest {
  user_id: string
  system_id: string
  login_active: boolean
}

type CreateUserSystemsResponse = UserSystems

export class CreateUserSystems {
  constructor(private userSystemsRepository: IUserSystemsRepository) {}

  async execute({
    user_id,
    system_id,
    login_active
  }: CreateUserSystemsRequest): Promise<CreateUserSystemsResponse> {
    /*const systemAlreadyExists = await this.userSystemsRepository.find(name)

    if (systemAlreadyExists) {
      throw new Error(`System already exists`)
    }*/

    const userSystems = new UserSystems({
      user_id,
      system_id,
      login_active
    })

    await this.userSystemsRepository.create(userSystems)

    return userSystems
  }
}
