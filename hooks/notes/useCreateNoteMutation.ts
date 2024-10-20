import { ApiResponse } from '@/types/apiHelpers';
import { Note } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateNoteMutation = () => {
  return useMutation({
    mutationFn: async (title: string) => {
      const {
        success,
        message,
        data: note,
      }: ApiResponse<Note> = await (
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

      return { note, message };
    },
  });
};
