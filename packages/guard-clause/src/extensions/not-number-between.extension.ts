import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export interface NotNumberBetweenMetadata {
  from: number
  to: number
}

export class NotNumberBetweenGuardExtension extends AbstractGuardExtension<NotNumberBetweenMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotNumberBetweenMetadata>
  ): void {
    if (
      !(
        typeof paramValue === 'number' &&
        paramValue >= options.metadata.from &&
        paramValue <= options.metadata.to
      )
    ) {
      throw new GuardError(
        'guard.against.not-number-between',
        options.parameter,
        paramValue,
        `not between [${options.metadata.from}, ${options.metadata.to}]`
      )
    }
  }
}
