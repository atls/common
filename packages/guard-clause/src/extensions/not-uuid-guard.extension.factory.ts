import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import validator                                     from 'validator'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotUUIDGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    const version = options.metadata?.version as Parameters<typeof validator.isUUID>[1]

    if (!version) {
      throw new Error('Guard against uuid version required')
    }

    if (!(typeof paramValue === 'string' && validator.isUUID(paramValue, version))) {
      throw new GuardError('guard.against.not-uuid', options.parameter, paramValue, 'not uuid')
    }
  }
}
