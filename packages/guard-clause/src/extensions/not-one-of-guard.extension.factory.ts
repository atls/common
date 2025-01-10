import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotOneOfGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!options.metadata!.oneOf.includes(paramValue)) {
      throw new GuardError(
        'guard.against.not-one-of',
        options.parameter,
        paramValue,
        `not one of '${(options.metadata!.oneOf?.name || options.metadata!.oneOf) as string}'`
      )
    }
  }
}
