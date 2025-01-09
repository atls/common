import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export class NotIntegerGuardExtension extends AbstractGuardExtension {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionOptions): void {
    if (!Number.isNaN(Number.parseInt(paramValue as string, 10))) {
      throw new GuardError(
        'guard.against.not-integer',
        options.parameter,
        paramValue,
        'not integer'
      )
    }
  }
}
