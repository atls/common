/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { GuardError }             from '../errors/index.js'
import type { AbstractGuardExtension } from './abstract-guard.extension.js'

import { GuardErrors }                 from '../errors/index.js'

export class GuardStore {
  private static extensions: Map<string | symbol, Array<AbstractGuardExtension>> = new Map()

  static add(key: string | symbol, extension: AbstractGuardExtension): void {
    const extensions = GuardStore.extensions.get(key)
    if (!extensions) {
      GuardStore.extensions.set(key, [extension])
      return
    }
    extensions.push(extension)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static perform(key: string | symbol, paramValue: any): void {
    const errors: Array<GuardError> = []

    const extensions = this.extensions.get(key)
    if (!extensions) return

    extensions.forEach((extension: AbstractGuardExtension) => {
      const performErrors = extension.perform(paramValue)
      errors.push(...performErrors)
    })

    if (errors.length > 0) {
      throw new GuardErrors(errors)
    }
  }
}
