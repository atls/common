import type { AbstractGuardExtensionFactoryOptions }   from '../../factory/index.js'
import type { DecoratorFactoryFn }                     from './decorator.interfaces.js'

import { GuardFactory }                                from '../../factory/index.js'
import { NotStringLengthBetweenGuardExtensionFactory } from '../../extensions/index.js'

export const NotStringLengthBetweenDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (from: number, to: number): DecoratorFactoryFn =>
    function NotStringLengthBetween(
      target: any,
      propertyKey: string,
      parameterIndex: number
    ): void {
      GuardFactory.register(
        NotStringLengthBetweenGuardExtensionFactory,
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
