import { prisma } from '@/lib/db';
import { HttpSetup } from '@/tests/utils/integration';
import { PrismaNextTestContext, getSetupData } from '@/tests/utils/setup';
import { Note } from '@prisma/client';
import { afterAll, expect, test } from 'vitest';

test('GET /notes', async (ctx: PrismaNextTestContext) => {
  const { user } = getSetupData();
  const { http } = await new HttpSetup(ctx).init();

  await prisma.note.createMany({
    data: [
      { userId: user.id, title: 'Steelers' },
      { userId: user.id, title: 'Lions' },
    ],
  });

  const {
    status,
    data: { success, message, data: fetchedNotes },
  } = await http.get<Note[]>({
    path: '/notes',
  });

  const notes = (
    await prisma.note.findMany({
      where: {
        userId: user.id,
      },
    })
  ).map((note) => ({
    ...note,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));

  expect(status).toBe(200);
  expect(success).toBe(true);
  expect(message).toBe('Notes gathered successfully.');
  expect(notes).toEqual(fetchedNotes);
});

afterAll(async () => {
  await prisma.note.deleteMany({});
});
