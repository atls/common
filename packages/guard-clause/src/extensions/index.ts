import { GuardFactory }                                from '../factory/index.js'
import { NotEmptyGuardExtensionFactory }               from './not-empty-guard.extension.factory.js'
import { NotEnumGuardExtensionFactory }                from './not-enum-guard.extension.factory.js'
import { NotInstanceGuardExtensionFactory }            from './not-instance-guard.extension.factory.js'
import { NotIntegerGuardExtensionFactory }             from './not-integer-guard.extension.factory.js'
import { NotISO4217GuardExtensionFactory }             from './not-iso4217-guard.extension.factory.js'
import { NotJsonSchemaValidGuardExtensionFactory }     from './not-json-schema-valid.extension.factory.js'
import { NotNumberBetweenGuardExtensionFactory }       from './not-number-between.extension.factory.js'
import { NotOneOfGuardExtensionFactory }               from './not-one-of-guard.extension.factory.js'
import { NotStringLengthBetweenGuardExtensionFactory } from './not-string-length-between.extension.factory.js'
import { NotUUIDGuardExtensionFactory }                from './not-uuid-guard.extension.factory.js'

export * from './not-empty-guard.extension.factory.js'
export * from './not-uuid-guard.extension.factory.js'
export * from './not-number-between.extension.factory.js'
export * from './not-instance-guard.extension.factory.js'
export * from './not-integer-guard.extension.factory.js'
export * from './not-enum-guard.extension.factory.js'
export * from './not-one-of-guard.extension.factory.js'
export * from './not-string-length-between.extension.factory.js'
export * from './not-iso4217-guard.extension.factory.js'
export * from './not-json-schema-valid.extension.factory.js'

GuardFactory.registerExtension(new NotEmptyGuardExtensionFactory())
GuardFactory.registerExtension(new NotUUIDGuardExtensionFactory())
GuardFactory.registerExtension(new NotNumberBetweenGuardExtensionFactory())
GuardFactory.registerExtension(new NotInstanceGuardExtensionFactory())
GuardFactory.registerExtension(new NotIntegerGuardExtensionFactory())
GuardFactory.registerExtension(new NotEnumGuardExtensionFactory())
GuardFactory.registerExtension(new NotOneOfGuardExtensionFactory())
GuardFactory.registerExtension(new NotStringLengthBetweenGuardExtensionFactory())
GuardFactory.registerExtension(new NotISO4217GuardExtensionFactory())
GuardFactory.registerExtension(new NotJsonSchemaValidGuardExtensionFactory())
