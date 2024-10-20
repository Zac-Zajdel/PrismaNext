import { prisma } from '@/lib/db';
import { User } from 'next-auth';
import { z } from 'zod';

export const createApiTokenSchema = (user: User) => {
  return z
    .object({
      name: z.string(),
    })
    .superRefine(async (data, ctx) => {
      const hasSameTokenName = await prisma.apiToken.findFirst({
        where: {
          userId: user.id,
          name: data.name,
        },
      });

      if (hasSameTokenName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'API Token names must be unique.',
        });
      }
    });
};
