import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { AbstractGuardExtensionFactory }             from '../factory/index.js'
import { GuardError }                                from '../errors/index.js'

export class NotStringLengthBetweenGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (
      !(
        typeof paramValue === 'string' &&
        paramValue.length >= options.metadata!.from &&
        paramValue.length <= options.metadata!.to
      )
    ) {
      throw new GuardError(
        'guard.against.not-string-length-between',
        options.parameter,
        paramValue,
        `not between [${options.metadata!.from as number}, ${options.metadata!.to as number}]`
      )
    }
  }
}
