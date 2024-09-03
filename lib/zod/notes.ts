import { z } from 'zod';

export const createNoteSchema = () => {
  return z.object({
    title: z.string().min(1, 'Title cannot be empty'),
    description: z.string().optional(),
  });
};
