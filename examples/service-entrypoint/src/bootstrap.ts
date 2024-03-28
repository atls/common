import { Logger }      from '@atls/logger'
import { NestFactory } from '@nestjs/core'

import { ExampleServiceEntrypointModule } from './example-service-entrypoint.module'

declare const module: {
  hot: {
    accept: VoidFunction
    dispose: (callback: VoidFunction) => void
  }
}

const bootstrap = async () => {
  const app = await NestFactory.create(ExampleServiceEntrypointModule, {
    logger: new Logger(),
  })

  app.enableShutdownHooks()
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
