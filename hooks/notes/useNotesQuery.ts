import { ApiResponse } from '@/types/apiHelpers';
import { Note } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useNotesQuery = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async (): Promise<Note[]> => {
      const { success, message, data }: ApiResponse<Note[]> = await (
        await fetch(`/api/notes`)
      ).json();

      if (!success) {
        toast.error(message);
        throw new Error(message);
      }

      return data;
    },
  });
};
