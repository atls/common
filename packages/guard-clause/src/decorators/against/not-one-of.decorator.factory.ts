import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotOneOfGuardExtensionFactory }             from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotOneOfDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (oneOf: object): DecoratorFactoryFn =>
    function NotOneOf(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotOneOfGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
        metadata: {
          oneOf,
        },
      })
    }
