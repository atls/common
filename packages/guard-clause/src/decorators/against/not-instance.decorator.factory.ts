import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotInstanceGuardExtensionFactory }          from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotInstanceDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (targetTypeConstructor: Function): DecoratorFactoryFn =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function NotInstance(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotInstanceGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
        metadata: {
          targetTypeConstructor,
        },
      })
    }
