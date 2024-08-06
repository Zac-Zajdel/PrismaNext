import { type ClassValue, clsx } from 'clsx';
import { createHash } from 'crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashApiToken(apiToken: string): string {
  return createHash('sha256').update(apiToken).digest('hex');
}
