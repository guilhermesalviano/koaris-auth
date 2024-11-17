interface IUserSystemsProps {
  user_systems_id?: string
  user_id: string
  system_id: string
  login_active: boolean
}

export class UserSystems {
  private props: IUserSystemsProps

  get user_systems_id(): string | undefined {
    return this.props.user_systems_id
  }

  get user_id(): string {
    return this.props.user_id
  }

  get system_id(): string {
    return this.props.system_id
  }

  get login_active(): boolean {
    return this.props.login_active
  }

  constructor(props: IUserSystemsProps) {
    this.props = props
  }

  static create(
    props: IUserSystemsProps
  ): UserSystems {
    const userSystems = new UserSystems(props)

    return userSystems
  }
}