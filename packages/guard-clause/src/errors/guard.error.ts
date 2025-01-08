/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export class GuardError extends Error {
  public readonly code: string

  public readonly parameter: string

  public readonly value: any

  constructor(code: string, parameter: string, value: any, message: string) {
    super()

    this.code = code
    this.parameter = parameter
    this.value = value

    this.message = `Guard against '${parameter}' value '${value}' ${message}.`
  }
}
