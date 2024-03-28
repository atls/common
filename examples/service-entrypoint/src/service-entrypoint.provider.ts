import { Logger }     from '@atls/logger'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ServiceEntrypointProvider {
  private logger = new Logger('Entryprovider')

  constructor() {
    this.logger.log(1, 'hey')
  }
}
