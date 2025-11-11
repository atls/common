import assert             from 'node:assert'
import { describe }       from 'node:test'
import { beforeEach }     from 'node:test'
import { it }             from 'node:test'

import { SeverityNumber } from '@opentelemetry/api-logs'

describe('logger.configuration', () => {
  const { env } = process

  beforeEach(async () => {
    process.env = { ...env }
  })

  it('check accept default', async () => {
    const { LoggerConfiguration } = await import(`./logger.configuration.ts?t=${Date.now()}`)

    assert.strictEqual(LoggerConfiguration.accept(SeverityNumber.INFO), true)
  })

  it('check accept less level', async () => {
    const { LoggerConfiguration } = await import(`./logger.configuration.ts?t=${Date.now()}`)

    assert.strictEqual(LoggerConfiguration.accept(SeverityNumber.DEBUG), false)
  })

  it('check accept env configuration', async () => {
    process.env.LOG_LEVEL = 'DEBUG'

    const { LoggerConfiguration } = await import(`./logger.configuration.ts?t=${Date.now()}`)

    assert.strictEqual(LoggerConfiguration.accept(SeverityNumber.DEBUG), true)
  })

  it('check accept less level env configuration', async () => {
    process.env.LOG_LEVEL = 'DEBUG1'

    const { LoggerConfiguration } = await import(`./logger.configuration.ts?t=${Date.now()}`)

    assert.strictEqual(LoggerConfiguration.accept(SeverityNumber.DEBUG), false)
  })

  it('check accept debug', async () => {
    process.env.DEBUG = 'test'

    const { LoggerConfiguration } = await import(`./logger.configuration.ts?t=${Date.now()}`)

    assert.strictEqual(LoggerConfiguration.accept(SeverityNumber.DEBUG, 'test'), true)
  })
})
