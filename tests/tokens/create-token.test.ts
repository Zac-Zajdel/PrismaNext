import { prisma } from '@/lib/db';
import { hashApiToken } from '@/lib/utils';
import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext, getSetupData } from '@/tests/utils/setup';
import { afterAll, expect, test } from 'vitest';

test('POST /tokens', async (ctx: PrismaNextTestContext) => {
  const setup = await getSetupData();
  ctx.apiToken = setup.apiToken;

  const h = new HttpSetup(ctx);
  const { http } = await h.init();

  const {
    status,
    data: { success, message, data: token },
  } = await http.post<string>({
    path: '/tokens',
    body: {
      name: 'Custom API Token',
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
      userId: setup.user.id,
      name: 'Custom API Token',
      token: await hashApiToken(token),
      lastUsed: null,
    }),
  );
});

afterAll(async () => {
  await prisma.apiToken.deleteMany({});
});
