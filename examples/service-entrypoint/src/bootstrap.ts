import { NestFactory }                    from '@nestjs/core'

import { Logger }                         from '@atls/logger'

import { ExampleServiceEntrypointModule } from './example-service-entrypoint.module.js'

type HotModule = ImportMeta & {
  hot?: {
    accept: VoidFunction
    dispose: (callback: VoidFunction) => void
  }
}

const logger = new Logger()

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(ExampleServiceEntrypointModule, {
    logger,
  })

  app.enableShutdownHooks()
  await app.listen(3000)

  const { hot } = import.meta as HotModule

  if (hot) {
    hot.accept()
    hot.dispose(() => {
      app.close().catch((error) => {
        logger.error(error as Error)
      })
    })
  }
}

bootstrap().catch((error) => {
  logger.error(error as Error)
  process.exitCode = 1
})
