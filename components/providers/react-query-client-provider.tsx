'use client';

import { PrismaNextError } from '@/lib/prismaNextError';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { toast } from 'sonner';

function isPrismaNextError(error: any): error is PrismaNextError {
  return error instanceof PrismaNextError;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const message = error?.message || 'An Unknown Error Occurred.';

      if (isPrismaNextError(error)) {
        error.statusCode >= 500 ? toast.error(message) : toast.info(message);
      } else {
        toast.error(message);
      }
    },
  }),
});

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
