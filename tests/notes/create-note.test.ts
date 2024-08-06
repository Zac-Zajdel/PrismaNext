import { prisma } from '@/lib/db';
import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext, getSetupData } from '@/tests/utils/setup';
import { Note } from '@prisma/client';
import { afterAll, expect, test } from 'vitest';

test('POST /notes', async (ctx: PrismaNextTestContext) => {
  const setup = await getSetupData();
  ctx.apiToken = setup.apiToken;

  const h = new HttpSetup(ctx);
  const { http } = await h.init();

  const {
    status,
    data: { success, message, data: note },
  } = await http.post<Note>({
    path: '/notes',
    body: {
      title: 'This is a title',
      description: 'This is a description',
    },
  });

  expect(status).toBe(201);
  expect(success).toBe(true);
  expect(message).toBe('Note was created successfully.');
  expect(note).toEqual(
    expect.objectContaining({
      userId: setup.user.id,
      title: 'This is a title',
      description: 'This is a description',
    }),
  );
});

afterAll(async () => {
  await prisma.note.deleteMany({});
  await prisma.apiToken.deleteMany({});
});
