import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import validator                                     from 'validator'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotISO4217GuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (!(typeof paramValue === 'string' && validator.isISO4217(paramValue))) {
      throw new GuardError(
        'guard.against.not-iso4217',
        options.parameter,
        paramValue,
        'not iso4217 currency code'
      )
    }
  }
}
