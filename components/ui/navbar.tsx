'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut, useSession } from 'next-auth/react';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <div className="mx-auto border-b px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-center sm:justify-start">
            <div className="hidden flex-shrink-0 items-center sm:block">
              <h1 className="mr-4 text-lg font-bold">PrismaNext</h1>
            </div>
          </div>

          <div className="pr-4">
            <ModeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="mr-4 sm:mr-0"
            >
              <button className="flex cursor-pointer rounded-full hover:bg-black">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image as string}
                    alt="Profile Photo"
                  />
                  <AvatarFallback>
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 mt-1 sm:mr-5 xl:mr-1">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
