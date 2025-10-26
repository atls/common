import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotNumberBetweenGuardExtensionFactory }     from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotNumberBetweenDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (from: number, to: number): DecoratorFactoryFn =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function NotNumberBetween(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(
        NotNumberBetweenGuardExtensionFactory,
        target,
        propertyKey,
        parameterIndex,
        {
          parameter,
          options,
          metadata: {
            from,
            to,
          },
        }
      )
    }
