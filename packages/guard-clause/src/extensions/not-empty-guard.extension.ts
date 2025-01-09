import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export class NotEmptyGuardExtension extends AbstractGuardExtension {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionOptions): void {
    if (!paramValue) {
      throw new GuardError('guard.against.empty', options.parameter, paramValue, 'empty')
    }
  }
}
