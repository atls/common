/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotEnumGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!Object.values(options.metadata!.targetEnum).includes(paramValue)) {
      throw new GuardError(
        'guard.against.not-enum',
        options.parameter,
        paramValue,
        `not enum value of '${
          (options.metadata!.targetEnum?.name || options.metadata!.targetEnum) as string
        }'`
      )
    }
  }
}
