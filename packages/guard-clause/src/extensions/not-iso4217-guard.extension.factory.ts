import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import isIso4217ValidatorPkg                         from 'validator/lib/isISO4217.js'

import { AbstractGuardExtensionFactory }             from '../factory/index.js'
import { GuardError }                                from '../errors/index.js'

const isIso4217Validator = isIso4217ValidatorPkg.default || isIso4217ValidatorPkg

export class NotISO4217GuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (!(typeof paramValue === 'string' && isIso4217Validator(paramValue))) {
      throw new GuardError(
        'guard.against.not-iso4217',
        options.parameter,
        paramValue,
        'not iso4217 currency code'
      )
    }
  }
}
