/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { GuardFactory } from '../factory/index.js'

export const Guard = () =>
  function GuardD(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function GuardWrapper(
      ...args: Array<any>
    ): ReturnType<typeof originalMethod> {
      GuardFactory.perform(target, propertyKey, args)

      return originalMethod.apply(this, args)
    }
  }
