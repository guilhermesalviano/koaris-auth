import { Controller } from '../../../../core/infra/controller'
import { HttpResponse, fail, ok } from '../../../../infra/http/responses/http-response'
import { GetUser } from './get-user'

export class GetUserController implements Controller {
  constructor(private getUser: GetUser) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.getUser.execute({})
      return ok(result)
    } catch (error: any) {
      return fail(error)
    }
  }
}
