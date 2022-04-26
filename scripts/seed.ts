import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    const data: Prisma.UserCreateArgs['data'][] = [
      {
        email: 'admin@admin.com',
        hashedPassword:
          'b183972956adbe52bef6ec6b631a8f1219f40b6c3a5e4ddf71e5ae9481b44894',
        salt: '2116adafef89111b0d17b0c2c48dd516',
      },
      {
        email: 'user@user.com',
        hashedPassword:
          'e407984bdcf74c92d48092f029221735ee7b9f3d583eceb5641ce0ac64a21e80',
        salt: 'd84c85369efdbc6b99c36e0586417758',
      },
    ]
    console.log("\nUsing the default './scripts/seed.{js,ts}' template")

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      data.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )
  } catch (error) {
    console.error(error)
  }
}
