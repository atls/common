import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export interface NotEnumMetadata {
  targetEnum: Record<string, unknown>
}

export class NotEnumGuardExtension extends AbstractGuardExtension<NotEnumMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotEnumMetadata>
  ): void {
    if (!Object.values(options.metadata.targetEnum).includes(paramValue)) {
      throw new GuardError(
        'guard.against.not-enum',
        options.parameter,
        paramValue,
        `not enum value of '${
          (options.metadata.targetEnum?.name || options.metadata.targetEnum) as string
        }'`
      )
    }
  }
}
