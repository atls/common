import type { AnySchema }                     from 'ajv'

import type { AbstractGuardExtensionOptions } from '../factory/index.js'

import AjvPkg                                 from 'ajv'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from '../factory/index.js'

const Ajv = AjvPkg.default || AjvPkg

export interface NotJsonSchemaValidMetadata {
  schema: AnySchema
  defs?: Record<string, AnySchema>
}

export class NotJsonSchemaValidGuardExtension extends AbstractGuardExtension<NotJsonSchemaValidMetadata> {
  override performParamValue(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    paramValue: any,
    options: AbstractGuardExtensionOptions<NotJsonSchemaValidMetadata>
  ): void {
    const ajv = new Ajv()

    if (options.metadata.defs) {
      ajv.addSchema(options.metadata.defs as AnySchema)
    }

    const validate = ajv.compile(options.metadata.schema)

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
