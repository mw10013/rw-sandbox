# README

## Development
- admin@admin.com/admin
- user@user.com/user

## Development Setup
- nvm use 16
- yarn rw setup ui tailwindcss
- yarn redwood generate page home /
- yarn rw setup auth dbAuth
- yarn rw prisma migrate dev
- yarn rw generate dbAuth
- yarn rw g scaffold admin/user

## Development CLI

- yarn rw prisma studio
- yarn rw g types | "VSCode GraphQL: Manual Restart"
- yarn rw g secret
- yarn rw prisma db push
- yarn rw prisma db seed
- yarn rw prisma migrate reset

## yarn rw setup auth dbAuth

You will need to add a couple of fields to your User table in order
    to store a hashed password and salt:

      model User {
        id                  Int @id @default(autoincrement())
        email               String  @unique
        hashedPassword      String    // <─┐
        salt                String    // <─┼─ add these lines
        resetToken          String?   // <─┤
        resetTokenExpiresAt DateTime? // <─┘
      }

    If you already have existing user records you will need to provide
    a default value for `hashedPassword` and `salt` or Prisma complains, so
    change those to:

      hashedPassword String @default("")
      salt           String @default("")

    If you expose any of your user data via GraphQL be sure to exclude
    `hashedPassword` and `salt` (or whatever you named them) from the
    SDL file that defines the fields for your user.

    You'll need to let Redwood know what fields you're using for your
    users' `id` and `username` fields. In this case we're using `id` and
    `email`, so update those in the `authFields` config in
    `/api/src/functions/auth.js` (this is also the place to tell Redwood if
    you used a different name for the `hashedPassword`, `salt`,
    `resetToken` or `resetTokenExpiresAt`, fields:`

      authFields: {
        id: 'id',
        username: 'email',
        hashedPassword: 'hashedPassword',
        salt: 'salt',
        resetToken: 'resetToken',
        resetTokenExpiresAt: 'resetTokenExpiresAt',
      },

    To get the actual user that's logged in, take a look at `getCurrentUser()`
    in `/api/src/lib/auth.js`. We default it to something simple, but you may
    use different names for your model or unique ID fields, in which case you
    need to update those calls (instructions are in the comment above the code).

    Finally, we created a SESSION_SECRET environment variable for you in
    /home/mw10013/src/rw-sandbox/.env. This value should NOT be checked
    into version control and should be unique for each environment you
    deploy to. If you ever need to log everyone out of your app at once
    change this secret to a new value and deploy. To create a new secret, run:

      yarn rw generate secret

    Need simple Login, Signup and Forgot Password pages? We've got a generator
    for those as well:

      yarn rw generate dbAuth

## yarn rw generate dbAuth

You'll need to tell your pages where to redirect after a user has logged in,
    signed up, or reset their password. Look in LoginPage, SignupPage,
    ForgotPasswordPage and ResetPasswordPage for these lines:

      if (isAuthenticated) {
        navigate(routes.home())
      }

    and change the route to where you want them to go if the user is already
    logged in. Also take a look in the onSubmit() functions in ForgotPasswordPage
    and ResetPasswordPage to change where the user redirects to after submitting
    those forms.

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
