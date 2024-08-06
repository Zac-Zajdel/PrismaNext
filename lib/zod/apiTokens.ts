import { z } from 'zod';

export const createApiTokenSchema = () => {
  return z.object({
    name: z.string(),
  });
};
