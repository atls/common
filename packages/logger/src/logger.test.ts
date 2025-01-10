/* eslint-disable */
import type { LogRecord }    from './logger.interfaces.js'

import { strictEqual }       from 'node:assert/strict'
import { describe as suite } from 'node:test'
import { beforeEach }        from 'node:test'
import { afterEach }         from 'node:test'
import { test }              from 'node:test'

import { Logger }            from './logger.js'
import { configuration }     from './logger.configuration.js'

suite('logger', () => {
  let originalTransport: Logger

  beforeEach(() => {
    // @ts-expect-error - Transport is a Logger
    originalTransport = configuration.transport
    // @ts-expect-error - Transport is a Logger
    configuration.transport = {
      info: () => {},
      debug: () => {},
      warn: () => {},
      error: () => {},
      fatal: () => {},
      trace: () => {},
    }
  })

  afterEach(() => {
    // @ts-expect-error - Transport is a Logger
    configuration.transport = originalTransport
  })

  test('log body', () => {
    let calledWith
    // @ts-expect-error - mock LogFn
    configuration.transport.info = (record: LogRecord) => {
      calledWith = record
    }

    new Logger().info('test')

    // @ts-expect-error - body is a string
    strictEqual(calledWith.body, 'test')
  })

  test('log attributes', () => {
    let calledWith
    // @ts-expect-error - mock LogFn
    configuration.transport.info = (record: LogRecord) => {
      calledWith = record
    }

    new Logger().info('test', { attr: 'test' })

    // @ts-expect-error - attributes
    strictEqual(calledWith.attributes.attr, 'test')
  })

  test('log name', () => {
    let calledWith
    // @ts-expect-error - mock LogFn
    configuration.transport.info = (record) => {
      calledWith = record
    }

    new Logger('test').info('test')

    // @ts-expect-error - name
    strictEqual(calledWith.name, 'test')
  })

  test('log child name', () => {
    let calledWith
    // @ts-expect-error - mock LogFn
    configuration.transport.info = (record) => {
      calledWith = record
    }

    new Logger('parent').child('child').info('test')

    // @ts-expect-error - name
    strictEqual(calledWith.name, 'parent:child')
  })

  test('log child attributes', () => {
    let calledWith
    // @ts-expect-error - mock LogFn
    configuration.transport.info = (record) => {
      calledWith = record
    }

    new Logger('parent', { parent: true }).child('child', { child: true }).info('test')

    // @ts-expect-error - attributes
    strictEqual(calledWith.attributes.parent, true)
    // @ts-expect-error - attributes
    strictEqual(calledWith.attributes.child, true)
  })

  test('log debug enabled', () => {
    configuration.setDebug('debug')

    let calledWith
    // @ts-expect-error - mock LogFn
    configuration.transport.debug = (record) => {
      calledWith = record
    }

    new Logger('debug').debug('debug')

    // @ts-expect-error - body
    strictEqual(calledWith.body, 'debug')
  })
})
