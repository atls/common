import type { SeverityText } from '../logger.interfaces'
import type { LogRecord }    from '../logger.interfaces'

import { SeverityName }      from '../logger.interfaces'

const serviceContext = {
  service: process.env.SERVICE_NAME || process.env.SERVICE_CONTEXT_NAME || process.env.HOSTNAME,
  version: process.env.SERVICE_CONTEXT_VERSION,
}

const convertSeverity = (severity: SeverityText): string => {
  switch (severity) {
    case SeverityName.TRACE:
      return 'DEFAULT'
    case SeverityName.DEBUG:
      return 'DEBUG'
    case SeverityName.INFO:
      return 'INFO'
    case SeverityName.WARN:
      return 'WARNING'
    case SeverityName.ERROR:
      return 'ERROR'
    case SeverityName.FATAL:
      return 'EMERGENCY'
    default:
      return 'DEFAULT'
  }
}

export class CloudLoggingFormatter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static format(record: LogRecord): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry: any = {
      severity: convertSeverity(record.severityText),
      logName: record.name,
      resource: record.resource,
      timestamp: record.timestamp,
      labels: record.attributes,
      trace: record.traceId,
      spanId: record.spanId,
    }

    if (typeof record.body === 'string') {
      entry.textPayload = record.body
    } else if (record.body instanceof Error) {
      entry.message = record.body.message
        ? `${record.body.message} ${record.body.stack}`
        : record.body.stack

      entry.serviceContext = serviceContext
    } else {
      entry.jsonPayload = record.body
    }

    return entry
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  log(object: any): any {
    return CloudLoggingFormatter.format(object as LogRecord)
  }
}
