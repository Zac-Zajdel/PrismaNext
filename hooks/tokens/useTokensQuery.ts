import { ApiResponse } from '@/types/apiHelpers';
import { ApiToken } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useTokensQuery = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: async (): Promise<ApiToken[]> => {
      const { success, message, data }: ApiResponse<ApiToken[]> = await (
        await fetch(`/api/tokens`)
      ).json();

      if (!success) throw new Error(message);

      return data;
    },
  });
};
