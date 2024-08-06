import { z } from 'zod';

export const createNoteSchema = () => {
  return z.object({
    title: z.string(),
    description: z.string().optional(),
  });
};
