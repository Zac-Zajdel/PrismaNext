import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { getUser } from './api/user'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Homepage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen px-2 py-0 flex flex-col justify-center items-center">
      <Head>
        <title>PrismaNext</title>
      </Head>

      <main className="px-0 py-20 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-4xl mb-3 text-center">
          Welcome to{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 no-underline hover:underline focus:underline active:underline"
          >
            Next.js
          </a>
          {' + '}
          <a
            href="https://www.prisma.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 no-underline hover:underline focus:underline active:underline"
          >
            Prisma
          </a>
          {' + '}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 no-underline hover:underline focus:underline active:underline"
          >
            Typescript
          </a>
          {' + '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 no-underline hover:underline focus:underline active:underline"
          >
            Tailwind CSS!
          </a>
        </h1>

        <span className="text-xl text-center pt-6">
          {session?.user ? (
            <div className="flex justify-center items-center">
              <span className="pr-4">
                You have successfully signed as {session.user.name}
              </span>
              <Image
                src={session?.user?.image || ''}
                width={30}
                height={30}
                alt="profile photo"
                className="rounded-full"
              />
            </div>
          ) : null}
        </span>

        <div className="text-xl text-center pt-6">
          The first users name from your local database is:{' '}
          <span className="pt-2 text-blue-600 text-2xl">
            {user?.name ?? 'No Users Exists Yet'}
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center max-w-screen-md mt-12 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 flex-grow flex-shrink-0 m-4 p-5 text-left no-underline border border-gray-200 rounded-xl transition duration-500 ease-in-out transform hover:text-blue-600 hover:border-2 hover:border-blue-600 focus:text-blue-600 focus:border-blue-600 active:text-blue-600 active:border-blue-600"
          >
            <h3 className="mb-4 text-xl">Next.js &rarr;</h3>
            <span className="text-xl">
              Find in-depth information about Next.js features and API.
            </span>
          </a>

          <a
            href="https://www.prisma.io"
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 flex-grow flex-shrink-0 m-4 p-5 text-left no-underline border border-gray-200 rounded-xl transition duration-500 ease-in-out transform hover:text-blue-600 hover:border-2 hover:border-blue-600 focus:text-blue-600 focus:border-blue-600 active:text-blue-600 active:border-blue-600"
          >
            <h3 className="mb-4 text-xl">Prisma &rarr;</h3>
            <span className="text-xl">
              A next-generation Node.js and Typescript ORM.
            </span>
          </a>

          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 flex-grow flex-shrink-0 m-4 p-5 text-left no-underline border border-gray-200 rounded-xl transition duration-500 ease-in-out transform hover:text-blue-600 hover:border-2 hover:border-blue-600 focus:text-blue-600 focus:border-blue-600 active:text-blue-600 active:border-blue-600"
          >
            <h3 className="mb-4 text-xl">TypeScript &rarr;</h3>
            <span className="text-xl">
              A strongly typed programming language built on JavaScript.
            </span>
          </a>

          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 flex-grow flex-shrink-0 m-4 p-5 text-left no-underline border border-gray-200 rounded-xl transition duration-500 ease-in-out transform hover:text-blue-600 hover:border-2 hover:border-blue-600 focus:text-blue-600 focus:border-blue-600 active:text-blue-600 active:border-blue-600"
          >
            <h3 className="mb-4 text-xl">Tailwind CSS &rarr;</h3>
            <span className="text-xl">
              A utility-first CSS framework to build modern websites.
            </span>
          </a>
        </div>
      </main>
    </div>
  )
}

/**
 * @desc Returns the first user inside of your local database
 * @info - Must run yarn prisma db seed for this to work for exploration of template
 * @returns User
 */
export const getServerSideProps = async () => {
  const user = await getUser()
  return {
    props: { user },
  }
}

export default Homepage
