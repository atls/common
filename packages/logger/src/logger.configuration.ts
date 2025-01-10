import type { LoggerOptions }    from 'pino'
import type { Logger }           from 'pino'

import type { SeverityKind }     from './logger.interfaces.js'

import { pino }                  from 'pino'

import { Severity }              from './logger.interfaces.js'
import { CloudLoggingFormatter } from './transport/index.js'

export class Configuration {
  debug?: Array<string>

  severity: SeverityKind

  transport: Logger

  constructor() {
    if (process.env.DEBUG) {
      this.debug = process.env.DEBUG.split(',')
    }

    if (process.env.LOG_LEVEL) {
      // @ts-expect-error - Severity is a string
      this.severity = Severity[process.env.LOG_LEVEL] || Severity.INFO
    } else {
      this.severity = Severity.INFO
    }

    const transportOptions: LoggerOptions = {
      level: 'trace',
      base: null,
      timestamp: false,
    }

    if (process.env.NODE_ENV === 'production') {
      transportOptions.formatters = new CloudLoggingFormatter()
    }

    this.transport = pino(transportOptions)
  }

  getSeverity(name?: string): SeverityKind {
    if (this.debug && name && this.debug.includes(name)) {
      return Severity.DEBUG
    }

    return this.severity
  }

  setDebug(debug: string): void {
    this.debug = debug.split(',')
  }
}

export const configuration = new Configuration()
