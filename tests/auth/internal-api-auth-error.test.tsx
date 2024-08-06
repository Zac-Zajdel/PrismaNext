import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext } from '@/tests/utils/setup';
import { expect, test } from 'vitest';

test('INTERNAL API AUTH ERROR', async (ctx: PrismaNextTestContext) => {
  const h = new HttpSetup(ctx);
  const { http } = await h.init();

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
  expect(error).toBe('Unauthorized');
});
