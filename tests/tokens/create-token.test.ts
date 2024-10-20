import { hashApiToken } from '@/lib/api/apiTokens/utils';
import { prisma } from '@/lib/db';
import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext, getSetupData } from '@/tests/utils/setup';
import { randomBytes } from 'crypto';
import { expect, test } from 'vitest';

test('POST /tokens', async (ctx: PrismaNextTestContext) => {
  const { user } = getSetupData();
  const { http } = await new HttpSetup(ctx).init();

  const name = `API Token - ${randomBytes(15).toString('hex').toString()}`;

  const {
    status,
    data: { success, message, data: token },
  } = await http.post<string>({
    path: '/tokens',
    body: {
      name,
    },
  });

  expect(status).toBe(201);
  expect(success).toBe(true);
  expect(token).not.toBeNull();
  expect(message).toBe(
    "Store this API Token in a secure place. You won't be able to retrieve it again later.",
  );

  const generatedApiToken = await prisma.apiToken.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  expect(generatedApiToken).toEqual(
    expect.objectContaining({
      name,
      userId: user.id,
      token: hashApiToken(token),
      lastUsed: null,
    }),
  );
});
