import { Controller } from '../../../../core/infra/controller'
import { HttpResponse, created, fail } from '../../../../infra/http/responses/http-response'
import { CreateSystem } from './create-system'

type CreateSystemControllerRequest = {
  name: string
  description: string
  updated_at: Date
  created_at: Date
}

export class CreateSystemController implements Controller {
  constructor(
    // private readonly validator: Validator<CreateSerieControllerRequest>,
    private createSystem: CreateSystem,
  ) {}

  async handle(request: CreateSystemControllerRequest): Promise<HttpResponse> {
    try {
      const { name, description, updated_at, created_at } = request

      const result = await this.createSystem.execute({
        name,
        description,
        updated_at,
        created_at,
      })

      return created(result)
    } catch (error: any) {
      return fail(error)
    }
  }
}
