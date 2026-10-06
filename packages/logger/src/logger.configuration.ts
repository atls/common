import { SeverityNumber } from '@opentelemetry/api-logs'

export class LoggerConfiguration {
  private static severityNumber: SeverityNumber | undefined

  private static debug: Array<string> | undefined

  static accept(severityNumber: SeverityNumber, debug?: string): boolean {
    if (debug && LoggerConfiguration.getDebug().includes(debug)) {
      return true
    }

    return severityNumber >= LoggerConfiguration.getSeverityNumber()
  }

  private static getSeverityNumber(): SeverityNumber {
    if (LoggerConfiguration.severityNumber === undefined) {
      const level = process.env.LOG_LEVEL
      const value: unknown = level && SeverityNumber[level as keyof typeof SeverityNumber]

      LoggerConfiguration.severityNumber = typeof value === 'number' ? value : SeverityNumber.INFO
    }

    return LoggerConfiguration.severityNumber
  }

  private static getDebug(): Array<string> {
    if (!LoggerConfiguration.debug) {
      LoggerConfiguration.debug = (process.env.DEBUG || '').split(',')
    }

    return LoggerConfiguration.debug
  }
}
