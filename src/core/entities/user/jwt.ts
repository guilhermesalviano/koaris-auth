import { sign, verify } from 'jsonwebtoken'

import { auth } from '@config/auth'
import { User } from './user'

interface JWTData {
  userId: string
  token: string
}

export interface JWTTokenPayload {
  exp: number
  sub: string
}

export class JWT {
  public readonly userId: string
  public readonly token: string

  private constructor({ userId, token }: JWTData) {
    this.userId = userId
    this.token = token
  }

  // public getUserId(): Either<InvalidJWTTokenError, string> {
  //   const jwtPayloadOrError = JWT.decodeToken(this.token)

  //   if (jwtPayloadOrError.isLeft()) {
  //     return left(jwtPayloadOrError.value)
  //   }

  //   const userId = jwtPayloadOrError.value.sub

  //   return right(userId)
  // }

  static decodeToken(
    token: string
  ):  JWTTokenPayload | Error {
    try {
      const decoded = verify(token, auth.secretKey) as JWTTokenPayload

      return decoded
    } catch (err) {
      return new Error()
    }
  }

  static createFromJWT(token: string): JWT | Error{
    const jwtPayloadOrError = this.decodeToken(token)

    if (jwtPayloadOrError instanceof Error) {
      throw new Error("Invalid JWT payload")
    }

    const jwt = new JWT({ token, userId: jwtPayloadOrError.sub })

    return jwt
  }

  static signUser(user: User): JWT {
    const token = sign({}, auth.secretKey, {
      subject: user.user_id,
      expiresIn: auth.expiresIn,
    })

    const jwt = new JWT({ userId: user.user_id, token })

    return jwt
  }
}