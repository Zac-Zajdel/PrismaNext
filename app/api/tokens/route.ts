import { hashApiToken } from '@/lib/api/apiTokens/utils';
import { withAuthManager } from '@/lib/authManager';
import { prisma } from '@/lib/db';
import { createApiTokenSchema } from '@/lib/zod/apiTokens';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export const POST = withAuthManager(async ({ req, user }) => {
  const schema = createApiTokenSchema();
  const { name } = schema.parse(await req.json());

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
});
