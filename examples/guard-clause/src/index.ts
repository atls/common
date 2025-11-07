import { Against, Guard, GuardErrors } from '@atls/guard-clause'

type SignUpPayload = {
  email: string
  age: number
  roles: Array<string>
  profileId?: string
}

export class UserOnboardingService {
  @Guard()
  register(
    @Against('email').Empty().NotStringLengthBetween(5, 128)
    email: string,
    @Against('age').NotNumberBetween(16, 120)
    age: number,
    @Against('roles').Optional.Each.NotOneOf(['root', 'god-mode'])
    roles: Array<string> = [],
    @Against('profileId').Optional.NotUUID('4')
    profileId?: string
  ): SignUpPayload {
    return { email, age, roles, profileId }
  }
}

const onboarding = new UserOnboardingService()

try {
  onboarding.register('', 14, ['root'], 'not-a-uuid')
} catch (error) {
  if (error instanceof GuardErrors) {
    const messages = error.errors.map((issue) => issue.message).join('\n')

    process.stderr.write(`Не пускаем пользователя:\n${messages}\n`)
  }
}
