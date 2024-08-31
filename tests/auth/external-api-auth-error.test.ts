import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext } from '@/tests/utils/setup';
import { expect, test } from 'vitest';

test('EXTERNAL API AUTH ERROR', async (ctx: PrismaNextTestContext) => {
  ctx.apiToken = 'INVALID API TOKEN';
  const { http } = await new HttpSetup(ctx, true).init();

  const {
    status,
    data: { success, error },
  } = await http.post<string>({
    path: '/tokens',
    body: {
      name: 'Good luck :)',
    },
  });

  expect(status).toBe(403);
  expect(success).toBe(false);
  expect(error).toBe('Unauthorized: Invalid API Token');
});
