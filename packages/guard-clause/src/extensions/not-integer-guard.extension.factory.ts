import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotIntegerGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
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
