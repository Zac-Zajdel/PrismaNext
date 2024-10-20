import { ApiResponse } from '@/types/apiHelpers';
import { Note } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useNotesQuery = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async (): Promise<Note[]> => {
      const {
        success,
        message,
        data: notes,
      }: ApiResponse<Note[]> = await (await fetch(`/api/notes`)).json();

      if (!success) throw new Error(message);

      return notes;
    },
  });
};
