import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { email: 'String983358', hashedPassword: 'String', salt: 'String' },
    },
    two: {
      data: { email: 'String853589', hashedPassword: 'String', salt: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
