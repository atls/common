import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotIntegerGuardExtensionFactory }           from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotIntegerDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (): DecoratorFactoryFn =>
    function NotInteger(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotIntegerGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
      })
    }
