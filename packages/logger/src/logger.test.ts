/**
 * @jest-environment node
 */

import { configuration } from './logger.configuration'
import { Logger }        from './logger'

describe('logger', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('log body', () => {
    const log = jest.spyOn(configuration.transport, 'info').mockImplementation(() => undefined)

    new Logger().info('test')

    expect(log).toHaveBeenCalledWith(expect.objectContaining({ body: 'test' }))
  })

  it('log attributes', () => {
    const log = jest.spyOn(configuration.transport, 'info').mockImplementation(() => undefined)

    new Logger().info('test', { attr: 'test' })

    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({ body: 'test', attributes: { attr: 'test' } })
    )
  })

  it('log name', () => {
    const log = jest.spyOn(configuration.transport, 'info').mockImplementation(() => undefined)

    new Logger('test').info('test')

    expect(log).toHaveBeenCalledWith(expect.objectContaining({ name: 'test' }))
  })

  it('log child name', () => {
    const log = jest.spyOn(configuration.transport, 'info').mockImplementation(() => undefined)

    new Logger('parent').child('child').info('test')

    expect(log).toHaveBeenCalledWith(expect.objectContaining({ name: 'parent:child' }))
  })

  it('log child attributes', () => {
    const log = jest.spyOn(configuration.transport, 'info').mockImplementation(() => undefined)

    new Logger('parent', { parent: true }).child('child', { child: true }).info('test')

    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({ attributes: { parent: true, child: true } })
    )
  })

  it('log debug enabled', () => {
    configuration.setDebug('debug')

    const log = jest.spyOn(configuration.transport, 'debug').mockImplementation(() => undefined)

    new Logger('debug').debug('debug')

    expect(log).toHaveBeenCalledWith(expect.objectContaining({ body: 'debug' }))
  })
})
