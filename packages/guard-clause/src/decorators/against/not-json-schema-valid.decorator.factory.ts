import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotJsonSchemaValidGuardExtensionFactory }   from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotJsonSchemaValidDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  (schema: any, defs?: Array<any>): DecoratorFactoryFn =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function NotJsonSchemaValid(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(
        NotJsonSchemaValidGuardExtensionFactory,
        target,
        propertyKey,
        parameterIndex,
        {
          parameter,
          options,
          metadata: {
            schema,
            defs,
          },
        }
      )
    }
