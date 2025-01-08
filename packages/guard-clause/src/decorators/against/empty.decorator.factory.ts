import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotEmptyGuardExtensionFactory }             from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const EmptyDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (): DecoratorFactoryFn =>
    function Empty(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotEmptyGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
      })
    }
