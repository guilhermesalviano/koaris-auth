import { Middleware } from '@core/middleware'
import { decode } from 'jsonwebtoken'
import { HttpResponse, forbidden, ok } from '../responses/http-response'
import { fail } from 'assert'
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

      if (accessToken) {
        try {
          const decoded = decode(accessToken) as DecodedJwt

          return ok({ userId: decoded.sub })
        } catch (err) {
          return forbidden(new AccessDeniedError())
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error: any) {
      return fail(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}