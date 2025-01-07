import type { GuardError } from './guard.error.js'

export class GuardErrors extends Error {
  public readonly errors: Array<GuardError>

  constructor(errors: Array<GuardError>) {
    super()

    this.errors = errors
    this.message = 'Guard errors'
  }
}
