import { ApiResponse } from '@/types/apiHelpers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateTokenMutation = () => {
  return useMutation({
    mutationFn: async (
      name: string,
    ): Promise<{ token: string; message: string }> => {
      const {
        success,
        message,
        data: token,
      }: ApiResponse<string> = await (
        await fetch('/api/tokens', {
          method: 'POST',
          body: JSON.stringify({
            name,
          }),
        })
      ).json();

      if (!success) throw new Error(message);

      return {
        token,
        message,
      };
    },
    onError: (error) => toast.error(error.message),
  });
};
