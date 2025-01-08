import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotNumberBetweenGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (
      !(
        typeof paramValue === 'number' &&
        paramValue >= options.metadata!.from &&
        paramValue <= options.metadata!.to
      )
    ) {
      throw new GuardError(
        'guard.against.not-number-between',
        options.parameter,
        paramValue,
        `not between [${options.metadata!.from as number}, ${options.metadata!.to as number}]`
      )
    }
  }
}
