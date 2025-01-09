import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export interface NotStringLengthBetweenMetadata {
  from: number
  to: number
}

export class NotStringLengthBetweenGuardExtension extends AbstractGuardExtension<NotStringLengthBetweenMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotStringLengthBetweenMetadata>
  ): void {
    if (
      !(
        typeof paramValue === 'string' &&
        paramValue.length >= options.metadata.from &&
        paramValue.length <= options.metadata.to
      )
    ) {
      throw new GuardError(
        'guard.against.not-string-length-between',
        options.parameter,
        paramValue,
        `not between [${options.metadata.from}, ${options.metadata.to}]`
      )
    }
  }
}
