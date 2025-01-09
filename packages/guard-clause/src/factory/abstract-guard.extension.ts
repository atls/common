/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { GuardError } from '../errors/index.js'

export interface AbstractGuardExtensionOptions<MD = null> {
  parameter: string
  metadata: MD
  options?: { optional?: boolean; each?: boolean }
}

export abstract class AbstractGuardExtension<MD = null> {
  private options: AbstractGuardExtensionOptions<MD>

  setOptions(options: AbstractGuardExtensionOptions<MD>): void {
    this.options = options
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  perform(value: any): Array<GuardError> {
    const errors: Array<GuardError> = []

    if (this.options.options?.optional && (value === undefined || value === null)) {
      return errors
    }

    if (this.options.options?.each === true && !Array.isArray(value)) {
      errors.push(
        new GuardError(
          'guard.against.not-array',
          this.options.parameter,
          value,
          'each option true but value not array'
        )
      )
      return errors
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const performValues: Array<any> = this.options.options?.each ? value : [value]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    performValues.forEach((performValue: any) => {
      try {
        this.performParamValue(performValue, this.options)
      } catch (error) {
        if (!(error instanceof GuardError)) {
          throw error
        }
        errors.push(error)
      }
    })

    return errors
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract performParamValue(paramValue: any, options: AbstractGuardExtensionOptions<MD>): void
}
