import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'

import { GuardFactory }                              from '../../factory/index.js'
import { NotISO4217GuardExtensionFactory }           from '../../extensions/index.js'

export const NotISO4217DecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  () =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function NotISO4217(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotISO4217GuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
        metadata: {},
      })
    }
