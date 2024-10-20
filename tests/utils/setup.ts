import { hashApiToken } from '@/lib/api/apiTokens/utils';
import { prisma } from '@/lib/db';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { beforeAll, TestContext } from 'vitest';

export interface PrismaNextTestContext extends TestContext {
  apiToken: string;
}

declare global {
  var user: User;
  var apiToken: string;
}

beforeAll(async () => {
  if (global.user && global.apiToken) return;

  const apiUser = await prisma.user.upsert({
    where: {
      email: 'johndoe@gmail.com',
    },
    update: {},
    create: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    },
  });

  global.user = apiUser;

  const token = randomBytes(32).toString('hex');
  await prisma.apiToken.create({
    data: {
      userId: user.id,
      name: faker.lorem.word(),
      token: hashApiToken(token),
    },
  });

  global.apiToken = token;
});

export function getSetupData() {
  return {
    apiToken: global.apiToken,
    user: global.user,
  };
}
