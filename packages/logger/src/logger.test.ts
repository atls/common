import assert     from 'node:assert/strict'
import { test }   from 'node:test'

import { Logger } from './index.js'

test('emits a log record through the configured provider', (context) => {
  const output: Array<string> = []
  const previousNodeEnv = process.env.NODE_ENV

  context.mock.method(process.stdout, 'write', (chunk: Uint8Array | string): boolean => {
    output.push(String(chunk))

    return true
  })

  process.env.NODE_ENV = 'test'

  try {
    new Logger('billing', { service: 'common' }).info('started', { requestId: 'sample' })

    assert.equal(output.length, 1)

    const record = JSON.parse(output[0]) as {
      severityText: string
      severityNumber: number
      body: string
      attributes: Record<string, unknown>
    }

    assert.equal(record.severityText, 'INFO')
    assert.equal(record.severityNumber, 9)
    assert.equal(record.body, 'started')
    assert.deepEqual(record.attributes, {
      service: 'common',
      requestId: 'sample',
      '@namespace': 'billing',
    })
  } finally {
    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previousNodeEnv
    }
  }
})
