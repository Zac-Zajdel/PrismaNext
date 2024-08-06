import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
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
      <main className="container mt-40">
        <div className="flex flex-col justify-center mx-auto">
          <h1 className="text-center text-5xl mb-8">(╯°□°)╯︵ ┻━┻</h1>
          <h2 className="text-center text-base mb-5">
            Looks like something went wrong...
          </h2>
          <div className="text-center">
            <Button variant="outline">
              <Link
                href="/login"
                prefetch={false}
              >
                <p className="text-sm">Try Again</p>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
