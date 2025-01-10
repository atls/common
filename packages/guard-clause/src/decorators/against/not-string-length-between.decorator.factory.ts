import type { AbstractGuardExtensionFactoryOptions }   from '../../factory/index.js'
import type { DecoratorFactoryFn }                     from './decorator.interfaces.js'

import { NotStringLengthBetweenGuardExtensionFactory } from '../../extensions/index.js'
import { GuardFactory }                                from '../../factory/index.js'

export const NotStringLengthBetweenDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (from: number, to: number): DecoratorFactoryFn =>
    function NotStringLengthBetween(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
