'use client';

import { queryClient } from '@/lib/utils';
import { QueryClientProvider } from '@tanstack/react-query';

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
