import type { AbstractGuardExtensionOptions } from './abstract-guard.extension.factory.js'

import { strictEqual }                        from 'node:assert/strict'
import { describe as suite }                  from 'node:test'
import { beforeEach }                         from 'node:test'
import { it as test }                         from 'node:test'

import { GuardError }                         from '../errors/index.js'
import { AbstractGuardExtension }             from './abstract-guard.extension.factory.js'

class TestGuardExtension extends AbstractGuardExtension {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  performParamValue(paramValue: any, options: AbstractGuardExtensionOptions): void {
    if (typeof paramValue !== 'string') {
      throw new GuardError('guard.against.not-string', options.parameter, paramValue, 'not string')
    }
  }
}

suite('AbstractGuardExtensionFactory', () => {
  let extension: TestGuardExtension

  beforeEach(() => {
    extension = new TestGuardExtension()
  })

  test('should return no errors when valid parameters are provided', () => {
    const options: AbstractGuardExtensionOptions = {
      parameter: 'param',
      options: { optional: false },
      metadata: null,
    }

    extension.setOptions(options)

    const errors = extension.perform('validString')

    strictEqual(errors.length, 0)
  })

  test('should return an error when a parameter is invalid', () => {
    const options: AbstractGuardExtensionOptions = {
      parameter: 'param',
      options: { optional: false },
      metadata: null,
    }

    extension.setOptions(options)

    const errors = extension.perform(123)

    strictEqual(errors.length, 1)
    const isErrorInstanceOfGuardError = errors[0] instanceof GuardError
    strictEqual(isErrorInstanceOfGuardError, true)
    strictEqual(errors[0].code, 'guard.against.not-string')
  })

  test('should skip optional parameters when they are undefined or null', () => {
    const options: AbstractGuardExtensionOptions = {
      parameter: 'param',
      options: { optional: true },
      metadata: null,
    }

    extension.setOptions(options)

    const errors = extension.perform(undefined)

    strictEqual(errors.length, 0)
  })

  test('should validate each value when `each` is true', () => {
    const options: AbstractGuardExtensionOptions = {
      parameter: 'param',
      options: { each: true },
      metadata: null,
    }

    extension.setOptions(options)

    const errors = extension.perform(['validString', 123])

    strictEqual(errors.length, 1)
    strictEqual(errors[0].code, 'guard.against.not-string')
  })

  test('should return an error if the parameter is not an array but `each` is true', () => {
    const options: AbstractGuardExtensionOptions = {
      parameter: 'param',
      options: { each: true },
      metadata: null,
    }

    extension.setOptions(options)

    const errors = extension.perform('notArray')

    strictEqual(errors.length, 1)
    strictEqual(errors[0].code, 'guard.against.not-array')
  })
})
