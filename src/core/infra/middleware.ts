import { HttpResponse } from "../../infra/http/responses/http-response";

export interface Middleware<T = any, U = any> {
  handle: (httpRequest: T, httpBody?: U) => Promise<HttpResponse | false>
}