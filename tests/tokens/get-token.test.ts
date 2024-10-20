import { prisma } from '@/lib/db';
import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext, getSetupData } from '@/tests/utils/setup';
import { ApiToken } from '@prisma/client';
import { expect, test } from 'vitest';

test('GET /tokens', async (ctx: PrismaNextTestContext) => {
  const { user } = getSetupData();
  const { http } = await new HttpSetup(ctx).init();

  const {
    status,
    data: { success, message, data: fetchedApiTokens },
  } = await http.get<ApiToken[]>({
    path: '/tokens',
  });

  const apiTokens = (
    await prisma.apiToken.findMany({
      where: {
        userId: user.id,
      },
    })
  ).map((token) => ({
    ...token,
    lastUsed: token.lastUsed ? token.lastUsed.toISOString() : null,
    createdAt: token.createdAt.toISOString(),
    updatedAt: token.updatedAt.toISOString(),
  }));

  expect(status).toBe(200);
  expect(success).toBe(true);
  expect(message).toBe('API Tokens gathered successfully.');
  expect(apiTokens).toEqual(fetchedApiTokens);
});
