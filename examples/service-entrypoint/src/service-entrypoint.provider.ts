import { Injectable } from '@nestjs/common'

import { Logger }     from '@atls/logger'

@Injectable()
export class ServiceEntrypointProvider {
  private logger = new Logger('Entry Provider')

  constructor() {
    this.logger.log(1, 'Hey мотхерфукер!11')
  }
}
