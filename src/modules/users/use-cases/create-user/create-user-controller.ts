import { Controller } from '../../../../core/infra/controller'
import { HttpResponse, created, fail } from '../../../../infra/http/responses/http-response'
import { CreateUser } from './create-user'

type CreateUserControllerRequest = {
  name: string
  email: string
  password: string
}

export class CreateUserController implements Controller {
  constructor(
    // private readonly validator: Validator<CreateSerieControllerRequest>,
    private createUser: CreateUser,
  ) {}

  async handle(request: CreateUserControllerRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = request

      const result = await this.createUser.execute({
        name,
        email,
        password,
        updated_at: new Date(),
        created_at: new Date()
      })

      return created(result)
    } catch (error: any) {
      return fail(error)
    }
  }
}
