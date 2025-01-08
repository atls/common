import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import isUuidValidatorPkg                            from 'validator/lib/isUUID.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

const isUuidValidator = isUuidValidatorPkg.default || isUuidValidatorPkg

export class NotUUIDGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (!options.metadata?.version) {
      throw new Error('Guard against uuid version required')
    }

    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      !(typeof paramValue === 'string' && isUuidValidator(paramValue, options.metadata.version))
    ) {
      throw new GuardError('guard.against.not-uuid', options.parameter, paramValue, 'not uuid')
    }
  }
}
