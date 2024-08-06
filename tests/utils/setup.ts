import { prisma } from '@/lib/db';
import { hashApiToken } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { beforeAll, TestContext } from 'vitest';

export interface PrismaNextTestContext extends TestContext {
  apiToken: string;
}

let apiToken: string;
let user: User;

beforeAll(async () => {
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
  user = apiUser;

  const token = randomBytes(32).toString('hex');
  await prisma.apiToken.create({
    data: {
      userId: user.id,
      name: faker.lorem.word(),
      token: await hashApiToken(token),
    },
  });

  apiToken = token;
});

export function getSetupData() {
  return {
    apiToken,
    user,
  };
}
