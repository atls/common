import { Module }                    from '@nestjs/common'

import { ServiceEntrypointProvider } from './service-entrypoint.provider.js'

@Module({
  providers: [ServiceEntrypointProvider],
})
export class ExampleServiceEntrypointModule {}
