import { ApiResponse } from '@/types/apiHelpers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateTokenMutation = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      const { success, message, data }: ApiResponse<string> = await (
        await fetch('/api/tokens', {
          method: 'POST',
          body: JSON.stringify({
            name,
          }),
        })
      ).json();

      if (!success) {
        toast.error(message);
        throw new Error(message);
      }

      return {
        data,
        message,
      };
    },
  });
};
