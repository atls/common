import type { AbstractGuardExtensionFactoryOptions } from '../../factory/index.js'

import { EmptyDecoratorFactory }                     from './empty.decorator.factory.js'
import { NotUUIDDecoratorFactory }                   from './not-uuid.decorator.factory.js'
import { NotNumberBetweenDecoratorFactory }          from './not-number-between.decorator.factory.js'
import { NotInstanceDecoratorFactory }               from './not-instance.decorator.factory.js'
import { NotIntegerDecoratorFactory }                from './not-integer.decorator.factory.js'
import { NotEnumDecoratorFactory }                   from './not-enum.decorator.factory.js'
import { NotOneOfDecoratorFactory }                  from './not-one-of.decorator.factory.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const factory = (name: string, options?: AbstractGuardExtensionFactoryOptions['options']) => ({
  Empty: EmptyDecoratorFactory(name, options),
  NotUUID: NotUUIDDecoratorFactory(name, options),
  NotInstance: NotInstanceDecoratorFactory(name, options),
  NotNumberBetween: NotNumberBetweenDecoratorFactory(name, options),
  NotInteger: NotIntegerDecoratorFactory(name, options),
  NotEnum: NotEnumDecoratorFactory(name, options),
  NotOneOf: NotOneOfDecoratorFactory(name, options),
})

export const Against = (
  name: string
): ReturnType<typeof factory> & {
  Optional: ReturnType<typeof factory>
  Each: ReturnType<typeof factory>
} => ({
  ...factory(name),
  Optional: factory(name, { optional: true }),
  Each: factory(name, { each: true }),
})
