import { Logger } from '@atls/logger'

process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? 'INFO'
process.env.DEBUG = process.env.DEBUG ?? 'app:dev'

const logger = new Logger('app', { service: 'billing' })

logger.info('стартанули процессинг заказов', { node: process.pid })

const workerLogger = logger.child('worker', { queue: 'invoices' })

workerLogger.debug('чекаем задачу', { jobId: 'sync-001' })
workerLogger.error(new Error('платёж улетел в отказ'), { gateway: 'stripe' })
