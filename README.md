This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- [React.js 18](https://reactjs.org) - Documentation for React.js
- [Next.js 12](https://nextjs.org) - Documentation for Next.js
- [Turborepo](https://turbo.build/) - Documentation for TurboRepo
- [NextAuth.js 4](https://next-auth.js.org/) - Documentation for NextAuth.js
- [Typescript 4](https://www.typescriptlang.org) - Documentation for TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/docs/) - Documentation for Tailwind CSS.
- [ESLint 8](https://eslint.org/) - Documentation for ESLint.
- [Prettier 2](https://prettier.io/docs/en/index.html) - Documentation for Prettier.
- [Husky 8](https://typicode.github.io/husky/#/) - Documentation for Husky.
- [Lint Staged 13](https://github.com/okonet/lint-staged) - Documentation for lint staged.

---

## Installation

```bash
git clone https://github.com/Zac-Zajdel/PrismaNext.git
```

```bash
yarn install
```

---

## Setup Prisma

Create a `.env` file and setup DATABASE_URL variable for example:

```bash
DATABASE_URL="mysql://root:password@localhost:3306/PrismaNext"
```

Run the following command to create generate Schema & Migration & Seed Table

```bash
yarn prisma migrate dev --name init
```

---

## Setup Google OAuth

1. Create a Google Project within your [Google Cloud console](https://console.cloud.google.com/getting-started?pli=1)
2. After creating your credentials, add them to your .env file

```bash
GOOGLE_CLIENT_ID="INSERT_CLIENT_ID_HERE"
GOOGLE_CLIENT_SECRET="INSERT_CLIENT_SECRET_HERE"
```

---

## Development

```bash
yarn dev
```

Reset your database to generate your own migration:

```bash
yarn prisma migrate reset
```

If you change the seeder file, you can easily run the seeder with the following:

```bash
yarn prisma db seed
```

---

## Production

```bash
npm run build or yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/user](http://localhost:3000/api/user). This endpoint can be edited in `pages/api/user.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

Copyright © 2022 by Zac Zajdel
