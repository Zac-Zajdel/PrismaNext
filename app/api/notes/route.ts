import { withAuthManager } from '@/lib/authManager';
import { prisma } from '@/lib/db';
import { createNoteSchema } from '@/lib/zod/notes';
import { ApiResponse } from '@/types/apiHelpers';
import { Note } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = withAuthManager(
  async ({ user }): Promise<NextResponse<ApiResponse<Note[]>>> => {
    const notes = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Notes gathered successfully.',
        data: notes,
      },
      { status: 200 },
    );
  },
);

export const POST = withAuthManager(
  async ({ req, user }): Promise<NextResponse<ApiResponse<Note>>> => {
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
  },
);
