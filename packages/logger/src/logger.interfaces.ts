export type AttributeValue =
  | Array<boolean | null | undefined>
  | Array<number | null | undefined>
  | Array<string | null | undefined>
  | boolean
  | number
  | string

export type Attributes = Record<string, AttributeValue>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BodyData = Record<string, any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
export type Body = BodyData | Error | any | string

export type SeverityNumber = number

export enum SeverityName {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export type SeverityText = keyof typeof SeverityName

export interface SeverityKind {
  text: SeverityText
  number: SeverityNumber
}

export class Severity {
  static TRACE: SeverityKind = {
    text: SeverityName.TRACE,
    number: 1,
  }

  static DEBUG: SeverityKind = {
    text: SeverityName.DEBUG,
    number: 5,
  }

  static INFO: SeverityKind = {
    text: SeverityName.INFO,
    number: 9,
  }

  static WARN: SeverityKind = {
    text: SeverityName.WARN,
    number: 13,
  }

  static ERROR: SeverityKind = {
    text: SeverityName.ERROR,
    number: 17,
  }

  static FATAL: SeverityKind = {
    text: SeverityName.FATAL,
    number: 21,
  }
}

export interface LogRecord {
  timestamp: number
  traceId?: string
  spanId?: string
  severityText: SeverityText
  severityNumber: SeverityNumber
  name?: string
  body: Body
  attributes?: Attributes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource?: any
}
