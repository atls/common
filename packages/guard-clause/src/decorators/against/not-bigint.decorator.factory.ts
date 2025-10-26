import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotBigIntGuardExtensionFactory }            from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotBigIntDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (): DecoratorFactoryFn =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function NotBigInt(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotBigIntGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
      })
    }
