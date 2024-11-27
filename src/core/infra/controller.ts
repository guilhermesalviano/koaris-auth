import { HttpResponse } from '../../infra/http/responses/http-response'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
