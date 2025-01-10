/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { AnySchema }                            from 'ajv'

import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import AjvPkg                                        from 'ajv'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

const Ajv = AjvPkg.default || AjvPkg

export class NotJsonSchemaValidGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    const ajv = new Ajv()

    if (options.metadata!.defs) {
      ajv.addSchema(options.metadata!.defs as AnySchema)
    }

    const validate = ajv.compile(options.metadata!.schema)

    if (!validate(paramValue)) {
      throw new GuardError(
        'guard.against.not-json-schema-valid',
        options.parameter,
        paramValue,
        'not json schema valid'
      )
    }
  }
}
