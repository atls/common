import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { AbstractGuardExtensionFactory }             from '../factory/index.js'
import { GuardError }                                from '../errors/index.js'

export class NotEmptyGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (!paramValue) {
      throw new GuardError('guard.against.empty', options.parameter, paramValue, 'empty')
    }
  }
}
