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
      <div className="mx-auto px-2 sm:px-6 lg:px-8 border-b">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-center sm:justify-start">
            <div className="flex-shrink-0 items-center hidden sm:block">
              <h1 className="text-lg font-bold mr-4">PrismaNext</h1>
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
              <button className="flex rounded-full hover:bg-black cursor-pointer">
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
            <DropdownMenuContent className="mt-1 mr-2 sm:mr-5 xl:mr-1">
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
