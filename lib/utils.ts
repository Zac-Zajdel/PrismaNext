import { PrismaNextError } from '@/lib/prismaNextError';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const message = error?.message || 'An Unknown Error Occurred.';

      if (error instanceof PrismaNextError) {
        error.statusCode >= 500 ? toast.error(message) : toast.info(message);
      } else {
        toast.error(message);
      }
    },
  }),
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
