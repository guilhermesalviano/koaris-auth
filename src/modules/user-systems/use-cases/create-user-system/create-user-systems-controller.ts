import { Controller } from '@core/infra/controller'
import { HttpResponse, created, fail } from '@infra/http/responses/http-response'
import { CreateUserSystems } from './create-user-systems'

type CreateUserSystemsControllerRequest = {
  user_id: string
  system_id: string
  login_active: boolean
}

export class CreateUserSystemsController implements Controller {
  constructor(
    // private readonly validator: Validator<CreateSerieControllerRequest>,
    private createUserSystems: CreateUserSystems,
  ) {}

  async handle(request: CreateUserSystemsControllerRequest): Promise<HttpResponse> {
    try {
      const { user_id, system_id, login_active } = request

      const result = await this.createUserSystems.execute({
        user_id,
        system_id,
        login_active
      })

      return created(result)
    } catch (error: any) {
      return fail(error)
    }
  }
}
