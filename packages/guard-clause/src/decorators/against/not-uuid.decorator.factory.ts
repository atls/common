import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'

import { GuardFactory }                              from '../../factory/index.js'
import { NotUUIDGuardExtensionFactory }              from '../../extensions/index.js'

export const NotUUIDDecoratorFactory = (
    parameter: string,
    options?: AbstractGuardExtensionFactoryOptions['options']
  ) =>
  (version: '1' | '2' | '3' | '4' | '5' | 'all' | 1 | 2 | 3 | 4 | 5) =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function NotUUID(target: any, propertyKey: string, parameterIndex: number): void {
      GuardFactory.register(NotUUIDGuardExtensionFactory, target, propertyKey, parameterIndex, {
        parameter,
        options,
        metadata: {
          version,
        },
      })
    }
