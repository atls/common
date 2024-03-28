import { Module } from '@nestjs/common'
import { ServiceEntrypointProvider } from './service-entrypoint.provider'

@Module({
  providers: [ServiceEntrypointProvider]
})
export class ExampleServiceEntrypointModule {
}
