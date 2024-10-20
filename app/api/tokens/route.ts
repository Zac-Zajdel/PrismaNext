import { hashApiToken } from '@/lib/api/apiTokens/utils';
import { withAuthManager } from '@/lib/authManager';
import { prisma } from '@/lib/db';
import { createApiTokenSchema } from '@/lib/zod/apiTokens';
import { ApiResponse } from '@/types/apiHelpers';
import { ApiToken } from '@prisma/client';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export const GET = withAuthManager(
  async ({ user }): Promise<NextResponse<ApiResponse<ApiToken[]>>> => {
    const apiTokens = await prisma.apiToken.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'API Tokens gathered successfully.',
        data: apiTokens,
      },
      { status: 200 },
    );
  },
);

export const POST = withAuthManager(
  async ({ req, user }): Promise<NextResponse<ApiResponse<string>>> => {
    const schema = createApiTokenSchema(user);
    const { name } = await schema.parseAsync(await req.json());

    // Generate a 32-byte token for user to include in API requests.
    const apiToken = randomBytes(32).toString('hex');

    // Generate SHA-256 token for database storage.
    const hashedApiToken = hashApiToken(apiToken);

    await prisma.apiToken.create({
      data: {
        userId: user.id,
        name: name,
        token: hashedApiToken,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Store this API Token in a secure place. You won't be able to retrieve it again later.",
        data: apiToken,
      },
      { status: 201 },
    );
  },
);
