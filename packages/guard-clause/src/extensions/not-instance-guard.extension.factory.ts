import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export interface NotInstanceMetadata {
  targetTypeConstructor: Function
}

export class NotInstanceGuardExtension extends AbstractGuardExtension<NotInstanceMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotInstanceMetadata>
  ): void {
    if (
      !(
        options.metadata.targetTypeConstructor &&
        typeof options.metadata.targetTypeConstructor === 'function' &&
        paramValue instanceof options.metadata.targetTypeConstructor
      )
    ) {
      throw new GuardError(
        'guard.against.not-instance',
        options.parameter,
        paramValue,
        `not instance '${
          (options.metadata.targetTypeConstructor?.name ||
            options.metadata.targetTypeConstructor) as string
        }'`
      )
    }
  }
}
