import { auth } from '@/auth';
import { env } from '@/env';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAuthRoute = /\/(login|signup)/.test(req.url);

  if (req.auth && isAuthRoute) {
    return NextResponse.redirect(new URL('/notes', req.url));
  }

  if (!req.auth && req.url !== env.NEXT_PUBLIC_APP_URL && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/login', '/signup', '/notes', '/tokens'],
};
