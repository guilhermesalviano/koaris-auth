
export class Name {
  private readonly name: string

  get value(): string {
    return this.name
  }

  private constructor(name: string) {
    this.name = name
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false
    }

    return true
  }

  static create(name: string): Name | Error {
    if (!this.validate(name)) {
      return new Error(name)
    }

    return new Name(name)
  }
}