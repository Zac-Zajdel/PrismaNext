import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Access({ type }: { type: 'signup' | 'login' }) {
  return (
    <>
      <header className="pt-6">
        <div className="container flex items-center text-center">
          <Link
            href="/"
            prefetch={false}
          >
            <h1 className="text-xl font-bold">PrismaNext</h1>
          </Link>
        </div>
      </header>
      <main className="container mt-56">
        <div className="mx-auto flex flex-col justify-center">
          <h1 className="text-center text-5xl tracking-tight lg:text-6xl">
            {type === 'login' ? 'Login' : 'Sign Up'}
          </h1>

          <div className="mt-10 flex flex-col text-center">
            <form
              action={async () => {
                'use server';
                await signIn('google');
              }}
            >
              <Button
                className="w-80"
                type="submit"
              >
                Continue with Google
              </Button>
            </form>
          </div>

          <div className="flex items-center justify-center pt-10">
            <span className="w-80 border-t" />
          </div>

          <div className="mt-8 flex justify-center text-center text-base">
            {type === 'login' ? (
              <>
                <p className="text-muted-foreground">
                  Don&apos;t have an account?&nbsp;
                </p>
                <Link
                  href="/signup"
                  prefetch={false}
                  className="font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Already have an account?&nbsp;
                </p>
                <Link
                  href="/login"
                  prefetch={false}
                  className="font-semibold"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
