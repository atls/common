import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

export interface NotOneOfMetadata {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oneOf: Array<any>
}

export class NotOneOfGuardExtension extends AbstractGuardExtension<NotOneOfMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotOneOfMetadata>
  ): void {
    if (!options.metadata.oneOf.includes(paramValue)) {
      throw new GuardError(
        'guard.against.not-one-of',
        options.parameter,
        paramValue,
        // @ts-expect-error - oneOf is an array
        `not one of '${options.metadata.oneOf?.name || options.metadata.oneOf}'`
      )
    }
  }
}
