import { DomainError } from '@atls/core-errors'

type PaymentGateway = 'stripe' | 'cloud-payments'

type PaymentIntent = {
  id: string
  gateway: PaymentGateway
  amountMinor: number
  currency: string
}

export class PaymentRejectedError extends DomainError {
  public readonly intent: PaymentIntent

  private constructor(intent: PaymentIntent, reason: string) {
    super(`Платёж ${intent.id} улетел в трубу: ${reason}`)

    this.intent = intent
  }

  static becauseGatewayRejected(intent: PaymentIntent, reason: string): PaymentRejectedError {
    return new PaymentRejectedError(intent, reason)
  }
}

export const ensureCaptured = (intent: PaymentIntent & { captured: boolean }): PaymentIntent => {
  if (!intent.captured) {
    throw PaymentRejectedError.becauseGatewayRejected(intent, 'гейт закрыл транзакцию')
  }

  return intent
}

try {
  ensureCaptured({
    id: 'pay_123',
    gateway: 'stripe',
    amountMinor: 1990,
    currency: 'RUB',
    captured: false,
  })
} catch (error) {
  if (error instanceof PaymentRejectedError) {
    const { amountMinor, currency } = error.intent

    process.stderr.write(`Надо раскатать рефанд на ${amountMinor} ${currency}\n`)
  }
}
