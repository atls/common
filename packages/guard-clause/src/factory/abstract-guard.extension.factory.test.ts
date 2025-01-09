import type { AbstractGuardExtensionFactoryOptions } from './abstract-guard.extension.factory.js'

import { strictEqual }                               from 'node:assert/strict'
import { describe as suite }                         from 'node:test'
import { beforeEach }                                from 'node:test'
import { it as test }                                from 'node:test'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from './abstract-guard.extension.factory.js'

class TestGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    if (typeof paramValue !== 'string') {
      throw new GuardError('guard.against.not-string', options.parameter, paramValue, 'not string')
    }
  }
}

suite('AbstractGuardExtensionFactory', () => {
  let factory: TestGuardExtensionFactory

  beforeEach(() => {
    factory = new TestGuardExtensionFactory()
  })

  test('should return no errors when valid parameters are provided', () => {
    const target = {}
    const methodName = 'testMethod'
    const paramIndex = 0
    const options: AbstractGuardExtensionFactoryOptions = {
      parameter: 'param',
      options: { optional: false },
    }

    factory.register(target, methodName, paramIndex, options)

    const errors = factory.perform(target, methodName, ['validString'])

    strictEqual(errors.length, 0)
  })

  test('should return an error when a parameter is invalid', () => {
    const target = {}
    const methodName = 'testMethod'
    const paramIndex = 0
    const options: AbstractGuardExtensionFactoryOptions = {
      parameter: 'param',
      options: { optional: false },
    }

    factory.register(target, methodName, paramIndex, options)

    const errors = factory.perform(target, methodName, [123])

    strictEqual(errors.length, 1)
    const isErrorInstanceOfGuardError = errors[0] instanceof GuardError
    strictEqual(isErrorInstanceOfGuardError, true)
    strictEqual(errors[0].code, 'guard.against.not-string')
  })

  test('should skip optional parameters when they are undefined or null', () => {
    const target = {}
    const methodName = 'testMethod'
    const paramIndex = 0
    const options: AbstractGuardExtensionFactoryOptions = {
      parameter: 'param',
      options: { optional: true },
    }

    factory.register(target, methodName, paramIndex, options)

    const errors = factory.perform(target, methodName, [undefined])

    strictEqual(errors.length, 0)
  })

  test('should validate each value when `each` is true', () => {
    const target = {}
    const methodName = 'testMethod'
    const paramIndex = 0
    const options: AbstractGuardExtensionFactoryOptions = {
      parameter: 'param',
      options: { each: true },
    }

    factory.register(target, methodName, paramIndex, options)

    const errors = factory.perform(target, methodName, [['validString', 123]])

    strictEqual(errors.length, 1)
    strictEqual(errors[0].code, 'guard.against.not-string')
  })

  test('should return an error if the parameter is not an array but `each` is true', () => {
    const target = {}
    const methodName = 'testMethod'
    const paramIndex = 0
    const options: AbstractGuardExtensionFactoryOptions = {
      parameter: 'param',
      options: { each: true },
    }

    factory.register(target, methodName, paramIndex, options)

    const errors = factory.perform(target, methodName, ['notArray'])

    strictEqual(errors.length, 1)
    strictEqual(errors[0].code, 'guard.against.not-array')
  })
})
