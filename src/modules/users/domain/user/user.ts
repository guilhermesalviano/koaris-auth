import { v4 as uuid } from 'uuid'
import { Password } from './password'

interface IUserProps {
  user_id: string
  name: string
  email: string
  password: Password
  updated_at: Date
  created_at?: Date | string
}

export class User {
  private props: IUserProps

  get user_id(): string {
    return this.props.user_id
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): Password {
    return this.props.password
  }

  get updated_at(): Date {
    return this.props.updated_at
  }

  get created_at(): Date | string {
    return this.props.created_at || ``
  }

  constructor(props: Omit<IUserProps, 'user_id'>, user_id?: string) {
    this.props = {
      ...props,
      user_id: user_id || uuid(),
    }
  }

  static create(
    props: Omit<IUserProps, 'user_id'>,
    user_id?: string
  ): User {
    const user = new User(props, user_id)

    return user
  }
}