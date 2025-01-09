import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import isUuidValidatorPkg                     from 'validator/lib/isUUID.js'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

const isUuidValidator = isUuidValidatorPkg.default || isUuidValidatorPkg

export interface NotUUIDMetadata {
  version: 1 | 2 | 3 | 4 | 5
}

export class NotUUIDGuardExtension extends AbstractGuardExtension<NotUUIDMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotUUIDMetadata>
  ): void {
    if (
      !(typeof paramValue === 'string' && isUuidValidator(paramValue, options.metadata.version))
    ) {
      throw new GuardError('guard.against.not-uuid', options.parameter, paramValue, 'not uuid')
    }
  }
}
