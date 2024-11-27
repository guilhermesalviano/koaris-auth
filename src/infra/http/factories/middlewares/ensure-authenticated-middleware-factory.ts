import { Middleware } from "../../../../core/infra/middleware"

import { EnsureAuthenticatedMiddleware } from "../../../../infra/http/middlewares/ensure-authenticated-middleware"

export function makeEnsureAuthenticatedMiddleware(): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()

  return ensureAuthenticatedMiddleware
}