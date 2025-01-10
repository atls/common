import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'
import type { DecoratorFactoryFn }                   from './decorator.interfaces.js'

import { NotEnumGuardExtensionFactory }              from '../../extensions/index.js'
import { GuardFactory }                              from '../../factory/index.js'

export const NotEnumDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (targetEnum: object): DecoratorFactoryFn =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function NotEnum(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotEnumGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
        metadata: {
          targetEnum,
        },
      })
    }
