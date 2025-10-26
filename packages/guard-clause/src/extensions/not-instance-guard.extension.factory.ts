/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotInstanceGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (
      !(
        options.metadata!.targetTypeConstructor &&
        typeof options.metadata!.targetTypeConstructor === 'function' &&
        paramValue instanceof options.metadata!.targetTypeConstructor
      )
    ) {
      throw new GuardError(
        'guard.against.not-instance',
        options.parameter,
        paramValue,
        `not instance '${
          (options.metadata!.targetTypeConstructor?.name ||
            options.metadata!.targetTypeConstructor) as string
        }'`
      )
    }
  }
}
