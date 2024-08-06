import { withAuthManager } from '@/lib/authManager';
import { prisma } from '@/lib/db';
import { createNoteSchema } from '@/lib/zod/notes';
import { NextResponse } from 'next/server';

export const POST = withAuthManager(async ({ req, user }) => {
  const schema = createNoteSchema();
  const { title, description } = await schema.parseAsync(await req.json());

  const createdNote = await prisma.note.create({
    data: {
      userId: user.id,
      title: title,
      description: description,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: 'Note was created successfully.',
      data: createdNote,
    },
    { status: 201 },
  );
});
