/* copied from pino */
/* eslint-disable */

import { isMainThread } from 'node:worker_threads'

import SonicBoomPkg     from 'sonic-boom'
// @ts-ignore
import onExit           from 'on-exit-leak-free'

type SonicBoomStream = {
  destroyed: boolean
  write: (record: string) => void
  end: () => void
  flush: () => void
  flushSync: () => void
  destroy: () => void
  on: (event: string, listener: (...args: Array<any>) => void) => void
  removeListener: (event: string, listener: (...args: Array<any>) => void) => void
  emit: (event: string, ...args: Array<any>) => void
}

type SonicBoomConstructor = new (options: { fd: number }) => SonicBoomStream

const SonicBoom = (SonicBoomPkg || SonicBoomPkg) as unknown as SonicBoomConstructor

function noop() {}

function autoEnd(stream: any, eventName: string) {
  if (stream.destroyed) {
    return
  }

  if (eventName === 'beforeExit') {
    stream.flush()
    stream.on('drain', () => {
      stream.end()
    })
  } else {
    stream.flushSync()
  }
}

export const build = () => {
  // @ts-expect-error -- sonic-boom typings miss the construct signature in nodenext mode
  const stream = new SonicBoom({ fd: process.stdout.fd || 1 })

  stream.on('error', filterBrokenPipe)

  if (isMainThread) {
    onExit.register(stream, autoEnd)

    stream.on('close', () => {
      onExit.unregister(stream)
    })
  }

  function filterBrokenPipe(error: unknown) {
    if ((error as any).code === 'EPIPE') {
      // @ts-ignore
      stream.write = noop
      stream.end = noop
      stream.flushSync = noop
      stream.destroy = noop

      return
    }

    stream.removeListener('error', filterBrokenPipe)
    stream.emit('error', error)
  }

  return stream
}
