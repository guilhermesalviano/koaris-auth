import { v4 as uuid } from 'uuid'

interface ISystemProps {
  system_id: string
  name: string
  description: string | null
  updated_at: Date
  created_at?: Date | string
}

export class System {
  private props: ISystemProps

  get system_id(): string {
    return this.props.system_id
  }

  get name(): string {
    return this.props.name
  }

  get description(): string | null {
    return this.props?.description
  }

  get updated_at(): Date {
    return this.props.updated_at
  }

  get created_at(): Date | string {
    return this.props.created_at || ``
  }

  constructor(props: Omit<ISystemProps, 'system_id'>, system_id?: string) {
    this.props = {
      ...props,
      system_id: system_id || uuid(),
    }
  }

  static create(
    props: Omit<ISystemProps, 'system_id'>,
    system_id?: string
  ): System {
    const system = new System(props, system_id)

    return system
  }
}