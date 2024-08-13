import { createHash } from 'crypto';

export function hashApiToken(apiToken: string): string {
  return createHash('sha256').update(apiToken).digest('hex');
}
