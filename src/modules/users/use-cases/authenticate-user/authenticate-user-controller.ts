
import { Controller } from '@core/infra/controller'
import { AuthenticateUser } from './authenticate-user'
import { HttpResponse, clientError, fail, ok } from '@infra/http/responses/http-response'

type AuthenticateUserControllerRequest = {
  email: string
  password: string
}

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle({
    email,
    password,
  }: AuthenticateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateUser.execute({
        email,
        password,
      })
        const token = result

        return ok(token)
    } catch (err: any) {
      return fail(err)
    }
  }
}