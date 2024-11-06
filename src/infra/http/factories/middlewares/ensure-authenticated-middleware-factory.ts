import { Middleware } from "@core/middleware"

import { EnsureAuthenticatedMiddleware } from "@infra/http/middlewares/ensure-authenticated-middleware"

export function makeEnsureAuthenticatedMiddleware(): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()

  return ensureAuthenticatedMiddleware
}