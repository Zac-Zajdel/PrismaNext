import { ApiResponse } from '@/types/apiHelpers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateNoteMutation = () => {
  return useMutation({
    mutationFn: async (title: string) => {
      const { success, message }: ApiResponse<string> = await (
        await fetch('/api/notes', {
          method: 'POST',
          body: JSON.stringify({
            title,
          }),
        })
      ).json();

      if (!success) {
        toast.error(message);
        throw new Error(message);
      }

      return { message };
    },
  });
};
