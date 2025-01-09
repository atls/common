import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export class NotBigIntGuardExtension extends AbstractGuardExtension {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionOptions): void {
    if (typeof paramValue !== 'bigint') {
      throw new GuardError('guard.against.not-bigint', options.parameter, paramValue, 'not BigInt')
    }
  }
}
