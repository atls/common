/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { GuardFactory } from '../factory/index.js'

export const Guard = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function GuardD(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value

    descriptor.value = function GuardWrapper(
      ...args: Array<any>
    ): ReturnType<typeof originalMethod> {
      GuardFactory.perform(target, propertyKey, args)

      return originalMethod.apply(this, args)
    }
  }
