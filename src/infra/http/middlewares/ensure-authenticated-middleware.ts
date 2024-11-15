import { Middleware } from '@core/infra/middleware'
import { JWT } from '@modules/users/domain/user/jwt'
import { HttpResponse, forbidden, ok } from '../responses/http-response'
import { AccessDeniedError } from '../errors/access-danied-error'

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      
      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      try {
        const decoded = JWT.decodeToken(accessToken) as DecodedJwt
        
        // tratar melhor está devolutiva
        if (!decoded.sub) {
          return forbidden(new AccessDeniedError())
        }

        return ok({ userId: decoded.sub })
      } catch (err) {
        return forbidden(new AccessDeniedError())
      }
    } catch (error: any) {
      return forbidden(new AccessDeniedError())
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}